import React from 'react';
import { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import './stylesheets/map.scss'
import SF_NEIGHBORHOODS from '../data/feature-example-sf';
import FIDI_CRIMES from '../data/fidi.geojson';
import NULL_CRIMES from '../data/null.geojson';
import FEATURE_COLLECTION from '../data/featureCollection.json';
const safeColor = "#67CF9A";
const fastColor = "red";
//showHeat
class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            map: "",
            userLocation: []
        }
        this.receiveCurrentLocation = this.props.receiveCurrentLocation;
        this.handleClick = this.handleClick.bind(this);
        this.createMap = this.createMap.bind(this);
        this.updateRoutes = this.updateRoutes.bind(this);
        this.renderLineLayer = this.renderLineLayer.bind(this);
        this.addLineLayer = this.addLineLayer.bind(this);
        this.addCrimeHeatMap = this.addCrimeHeatMap.bind(this);
    }
    componentDidMount() {
        this.createMap();
        this.interval = setInterval(() => navigator.geolocation.getCurrentPosition(res => {
            this.setState({userLocation: res})
        }), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if( this.props.showHeat ) {
                this.addCrimeHeatMap(FEATURE_COLLECTION);
            } else {
                this.addCrimeHeatMap(NULL_CRIMES);
            }
            this.updateRoutes(this.props.safestRoute, this.props.fastestRoute, this.props.setRoute);
        }
    }
    createMap() {
        const receiveCurrentLocation = this.props.receiveCurrentLocation;
        const addLineLayer = this.addLineLayer;

        const centerOnLoad = [-122.401334, 37.793987]; //center in middle of fidi
        const zoom = 14;
        const bounds = [
            [-122.553040, 37.651051], // Southwest coordinates
            [-122.317891, 37.890488]  // Northeast coordinates 
        ];

        mapboxgl.accessToken = 'pk.eyJ1Ijoia2F5bjAyIiwiYSI6ImNrMHduZmNrMTAyZHMzbnM5enVmdDN0dWkifQ._BNoD6MIe93DBi-0R-pCkQ';
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/kayn02/ck0wnpulx5a6i1cqiwvav4tae',
            center: centerOnLoad, //this is the center
            zoom: zoom,
            maxBounds: bounds
        });
        //create map
        let map = this.map;
        map.on('load', () => {
            map.addSource("sf-neighborhoods", {
                type: 'geojson',
                data: SF_NEIGHBORHOODS
            });
            map.addLayer({
                id: 'sf-neighborhoods-fill',
                source: 'sf-neighborhoods',
                type: 'fill',
                paint: {
                    'fill-outline-color': '#0040c8',
                    'fill-color': '#fff',
                    'fill-opacity': 0
                }
            });
            map.addLayer({
                id: 'sf-neighborhoods-outline',
                source: 'sf-neighborhoods',
                type: 'line',
                paint: {
                    'line-width': 2,
                    'line-color': 'white'
                }
            });
            map.addSource('crime', {
                "type": "geojson",
                "data": FEATURE_COLLECTION
            });
            map.addLayer({
                "id": "crimes-heat",
                "type": "heatmap",
                "source": "crime",
                "maxzoom": 15,
                "paint": {
                    // Increase the heatmap weight based on frequency and property magnitude
                    "heatmap-weight": [
                        "interpolate",
                        ["linear"],
                        ["get", "crimeRating"],
                        0, 0,
                        3000, 1
                    ],
                    // Increase the heatmap color weight weight by zoom level
                    // heatmap-intensity is a multiplier on top of heatmap-weight
                    "heatmap-intensity": {
                        "stops": [
                            [11, 1],
                            [15, 3]
                        ]
                    },
                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                    // Begin color ramp at 0-stop with a 0-transparancy color
                    // to create a blur-like effect.
                    "heatmap-color": [
                        "interpolate",
                        ["linear"],
                        ["heatmap-density"],
                        0, "rgba(33,102,172,0)",
                        0.2, "rgb(103,169,207)",
                        0.4, "rgb(209,229,240)",
                        0.6, "rgb(253,219,199)",
                        0.8, "rgb(239,138,98)",
                        1, "rgb(178,24,43)"
                    ],
                    // Adjust the heatmap radius by zoom level
                    "heatmap-radius": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        0, 2,
                        9, 20
                    ],
                    // Transition from heatmap to circle layer by zoom level
                    "heatmap-opacity": [
                        "interpolate",
                        ["linear"],
                        ["zoom"],
                        20, 1,
                        30, 0
                    ],
                }
            }, 'waterway-label');
            // map.removeLayer('trees-point');
            // map.removeSource('trees');

            map.addSource('trees', {
                type: 'geojson',
                data: FEATURE_COLLECTION
            });
            map.addLayer({
                id: 'trees-point',
                type: 'circle',
                source: 'trees',
                minzoom: 15,
                paint: {
                    // increase the radius of the circle as the zoom level and dbh value increases
                    'circle-radius': {
                        property: 'Theft',
                        type: 'exponential',
                        stops: [
                            [{ zoom: 15, value: 1 }, 5],
                            [{ zoom: 15, value: 62 }, 10],
                            [{ zoom: 22, value: 1 }, 20],
                            [{ zoom: 22, value: 62 }, 50],
                        ]
                    },
                    'circle-color': {
                        property: 'crimeRating',
                        type: 'exponential',
                        stops: [
                            [0, 'rgb(0,200,0)'],
                            [1, 'rgb(103,169,207)'],
                            [100, 'rgb(209,229,240)'],
                            [250, 'rgb(253,219,199)'],
                            [500, 'rgb(239,138,98)'],
                            [1000, 'rgb(178,24,43)'],
                            // [60, 'rgb(1,108,89)']
                        ]
                    },
                    'circle-stroke-color': 'white',
                    'circle-stroke-width': 1,
                    'circle-opacity': {
                        stops: [
                            [14, 0],
                            [15, 1]
                        ]
                    }
                }
            }, 'waterway-label');

            addLineLayer("fastestRoute", map, [], fastColor, 0)
            addLineLayer("safestRoute", map, [], safeColor, 0)
                      
            setTimeout(() => {
                this.props.setMap()
            }, 0)

            let marker;
            if (this.state.userLocation.length > 0) {
                marker = new mapboxgl.Marker()
                    .setLngLat([this.state.userLocation.coords.longitude,
                    this.state.userLocation.coords.latitude]) // [lng, lat] coordinates to place the marker at
                    .addTo(map);
            } else {
                navigator.geolocation.getCurrentPosition(res => {
                    this.setState({ userLocation: res });
                })
              //                marker = new mapboxgl.Marker()
              //                    .setLngLat([this.state.userLocation.coords.longitude,
              //                    this.state.userLocation.coords.latitude]) // [lng, lat] coordinates to place the marker at
              //                    .addTo(map);
            } 
      })

        map.on('click', 'trees-point', function (e) {

            const categories = ["Assault", "Robbery", "Intimination", "Weapons", "Theft", "Stolen", "Burglary", "Traffic", "Offences", "Suspicious", "Malicious Mischief", "Vandalism", "Miscellaneous", "Lost", "Disorderly", "Drug", "Warrant", "Missing", "Embezzlement", "Other", "Fraud", "Forgery", "Liquor"];
            function onIntersectionClick(crimes){
                let intersectionCrimeCount = [];
                categories.forEach( crimeCategory => {
                    if (crimes[crimeCategory] && crimes.crimeRating !== 0){
                        intersectionCrimeCount.push(`<b>${crimeCategory}:</b> ${crimes[crimeCategory]}`);
                    }
                })
                let rating;
                
                    if (parseFloat(crimes.crimeRating) < 1){
                        rating = "A"
                    } else if(parseFloat(crimes.crimeRating) >= 1 && parseFloat(crimes.crimeRating) < 100){
                        rating = "B"
                    } else if (parseFloat(crimes.crimeRating) >= 100 && parseFloat(crimes.crimeRating) < 250){
                        rating = "C"
                    } else if (parseFloat(crimes.crimeRating) >=250  && parseFloat(crimes.crimeRating) < 500){
                        rating = "D"
                    } else if (parseFloat(crimes.crimeRating) >= 500 && parseFloat(crimes.crimeRating) < 1000) {
                        rating = "E"
                    }else if (parseFloat(crimes.crimeRating) >= 1000 ){
                        rating = "F"
                    } else {
                        rating = "Bad Bad Not Good"
                    }
                    
                

                intersectionCrimeCount = intersectionCrimeCount.join(', ');
                intersectionCrimeCount = "<h2><b>Safety Rating:</b> "+ rating + "</h2>" + intersectionCrimeCount;
                
                return intersectionCrimeCount;
            }
            new mapboxgl.Popup()
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML(onIntersectionClick(e.features[0].properties))
                .addTo(map);
        });
    }


    addCrimeHeatMap(crimes){
        let map = this.map;
        let circleData = (crimes === NULL_CRIMES) ? NULL_CRIMES : FEATURE_COLLECTION
        map.removeLayer('crimes-heat');
        map.removeSource('crime');
        map.addSource('crime', {
            "type": "geojson",
            "data": crimes
        });
        map.addLayer({
            "id": "crimes-heat",
            "type": "heatmap",
            "source": "crime",
            "maxzoom": 15,
            "paint": {
                // Increase the heatmap weight based on frequency and property magnitude
                "heatmap-weight": [
                    "interpolate",
                    ["linear"],
                    ["get", "crimeRating"],
                    0, 0,
                    3000, 1
                ],
                // Increase the heatmap color weight weight by zoom level
                // heatmap-intensity is a multiplier on top of heatmap-weight
                "heatmap-intensity": {
                    "stops": [
                        [11, 1],
                        [15, 3]
                    ]
                },
                // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
                // Begin color ramp at 0-stop with a 0-transparancy color
                // to create a blur-like effect.
                "heatmap-color": [
                    "interpolate",
                    ["linear"],
                    ["heatmap-density"],
                    0, "rgba(33,102,172,0)",
                    0.2, "rgb(103,169,207)",
                    0.4, "rgb(209,229,240)",
                    0.6, "rgb(253,219,199)",
                    0.8, "rgb(239,138,98)",
                    1, "rgb(178,24,43)"
                ],
                // Adjust the heatmap radius by zoom level
                "heatmap-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0, 2,
                    9, 20
                ],
                // Transition from heatmap to circle layer by zoom level
                "heatmap-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    20, 1,
                    30, 0
                ],
            }
        }, 'waterway-label');
        map.removeLayer('trees-point');
        map.removeSource('trees');

        map.addSource('trees', {
            type: 'geojson',
            data: circleData
        });
        map.addLayer({
            id: 'trees-point',
            type: 'circle',
            source: 'trees',
            minzoom: 15,
            paint: {
                // increase the radius of the circle as the zoom level and dbh value increases
                'circle-radius': {
                    property: 'Theft',
                    type: 'exponential',
                    stops: [
                        [{ zoom: 15, value: 1 }, 5],
                        [{ zoom: 15, value: 62 }, 10],
                        [{ zoom: 22, value: 1 }, 20],
                        [{ zoom: 22, value: 62 }, 50],
                    ]
                },
                'circle-color': {
                    property: 'crimeRating',
                    type: 'exponential',
                    stops: [
                        [0, 'rgb(0,200,0)'],
                        [1, 'rgb(103,169,207)'],
                        [100, 'rgb(209,229,240)'],
                        [250, 'rgb(253,219,199)'],
                        [500, 'rgb(239,138,98)'],
                        [1000, 'rgb(178,24,43)'],
                        // [60, 'rgb(1,108,89)']
                    ]
                },
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                'circle-opacity': {
                    stops: [
                        [14, 0],
                        [15, 1]
                    ]
                }
            }
        }, 'waterway-label');
        
    }
    handleClick(e) {
        e.target.classList.add('hide')
        document.querySelector(".search-form").classList.remove('slide-out')
        document.querySelector(".search-form").classList.add('reveal')
        document.querySelector('#map').classList.add('fix')
    }
    updateRoutes(safestRoute = [], fastestRoute = [], setRoute){
        const map = this.map;
        let center;
        let zoom;

        if( setRoute === null ) {
            this.renderLineLayer("fastestRoute", map, fastestRoute, fastColor, 0);
            this.renderLineLayer("safestRoute", map, safestRoute, safeColor, 2);
            center = safestRoute.slice().sort()[Math.floor(safestRoute.length / 2)];
            zoom = 14.5;
        } else if ( setRoute === "safest" ) {
            this.renderLineLayer("fastestRoute", map, [], fastColor, 0);
            this.renderLineLayer("safestRoute", map, safestRoute, safeColor, 0);
            center = safestRoute[0];
            zoom = 16;
        } else if ( setRoute === "fastest") {
            this.renderLineLayer("safestRoute", map, [], fastColor, 0);
            this.renderLineLayer("fastestRoute", map, fastestRoute, fastColor, 0);
            center = fastestRoute[0];
            zoom = 16;
        }
        map.flyTo({ center, zoom });
    }

    renderLineLayer(id, map,route,color,offset){
        map.removeLayer(id);
        map.removeSource(id);
        this.addLineLayer(id, map, route, color, offset)
    }
    addLineLayer(id, map, route, color, offset){
        map.addLayer({
            id: id,
            type: "line",
            source: {
                type: "geojson",
                data: {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "LineString",
                        coordinates: route
                    }
                }
            },
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": color,
                "line-width": 4,
                // "line-offset": offset
            }
        });
    }
    render() {
        return (
            <div id='map'>
                {/* <div className='search-link'>
                    <input type="text" placeholder='Where to?' onFocus={this.handleClick} onBlur={this.hide} />
                </div> */}
            </div>
        )
    }
}
export default Map;
