import React from 'react';
import { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import './stylesheets/map.scss'
import SF_NEIGHBORHOODS from '../data/feature-example-sf'
import FIDI_CRIMES from '../data/fidi.geojson'
import NULL_CRIMES from '../data/null.geojson'
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
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            if( this.props.showHeat ) {
                this.addCrimeHeatMap(FIDI_CRIMES);
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
        map.on('load', function () {
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
                "data": NULL_CRIMES
            });
            map.addLayer({
                "id": "crimes-heat",
                "type": "heatmap",
                "source": "crime",
                "maxzoom": 16,
            }, 'waterway-label');

            map.addSource('trees', {
                type: 'geojson',
                data: NULL_CRIMES
            });
            map.addLayer({
                id: 'trees-point',
                type: 'circle',
                source: 'trees',
                minzoom: 16,
            }, 'waterway-label');

            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            });

            map.addControl(geolocate);
            geolocate.on('geolocate', function (e) {
                // debugger
                // console.log(e)                
                const lon = e.coords.longitude;
                const lat = e.coords.latitude;
                const position = [lon, lat];
                // console.log(position);
                receiveCurrentLocation(position);
            });
            addLineLayer("fastestRoute", map, [], fastColor, 0)
            addLineLayer("safestRoute", map, [], safeColor, 0)
            
        })
        map.on('click', 'trees-point', function (e) {
            new mapboxgl.Popup()
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML('<b>DBH:</b> ' + e.features[0].properties.incident_subcategory)
                .addTo(map);
        });
    }
    addCrimeHeatMap(crimes){
        let map = this.map;
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
            "maxzoom": 16,
            "paint": {
                // Increase the heatmap weight based on frequency and property magnitude
                "heatmap-weight": {
                    "property": 'cnn',
                    "type": 'exponential',
                    "stops": [
                        [1, 10],
                        [10, 100]
                    ]
                },
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
                    0, "rgba(0, 250,250 ,0)",
                    0.2, "rgb(227, 215, 84)",
                    0.4, "rgb(250,150,150)",
                    0.6, "rgb(253,100,100)",
                    0.8, "rgb(250,50,50)",
                    1, "rgb(250,0,0)"
                ],
                // Adjust the heatmap radius by zoom level
                "heatmap-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    1, 1,
                    3, 20
                ],
                // Transition from heatmap to circle layer by zoom level
                "heatmap-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    30, 1,
                    20000, 0
                ],
            }
        }, 'waterway-label');
        map.removeLayer('trees-point');
        map.removeSource('trees');

        map.addSource('trees', {
            type: 'geojson',
            data: FIDI_CRIMES
        });
        map.addLayer({
            id: 'trees-point',
            type: 'circle',
            source: 'trees',
            minzoom: 16,
            paint: {
                // increase the radius of the circle as the zoom level and dbh value increases
                'circle-radius': {
                    property: 'incident_subcategory',
                    type: 'exponential',
                    stops: [
                        [{ zoom: 16, value: 1 }, 5],
                        [{ zoom: 16, value: 62 }, 10],
                        [{ zoom: 22, value: 1 }, 20],
                        [{ zoom: 22, value: 62 }, 50],
                    ]
                },
                'circle-color': {
                    property: 'incident_subcategory',
                    type: 'exponential',
                    stops: [
                        [0, 'rgba(236,222,239,0)'],
                        [10, 'rgb(236,222,239)'],
                        [20, 'rgb(208,209,230)'],
                        [30, 'rgb(166,189,219)'],
                        [40, 'rgb(103,169,207)'],
                        [50, 'rgb(28,144,153)'],
                        [60, 'rgb(1,108,89)']
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