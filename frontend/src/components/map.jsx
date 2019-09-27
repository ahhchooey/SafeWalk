import React from 'react';
import { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import './stylesheets/map.scss'
import SF_NEIGHBORHOODS from '../data/feature-example-sf'

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            map: "",
            safestRoute: [],
            fastestRoute: [],
            selectedRoute: "NONE",
            userLocation: []
        }
        this.receiveCurrentLocation = this.props.receiveCurrentLocation;
        this.handleClick = this.handleClick.bind(this);
        this.createMap = this.createMap.bind(this);
        this.updateRoutes = this.updateRoutes.bind(this);
        this.addLineLayer = this.addLineLayer.bind(this);
    }
    createMap() {
        const receiveCurrentLocation = this.props.receiveCurrentLocation;

        const centerOnLoad = [-122.401334, 37.793987]; //random center
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
                console.log(position);
                receiveCurrentLocation(position);
                // this.setState({userLocation: position})
            });

            map.addLayer({
                id: "fastestRoute",
                type: "line",
                zoom: 11,
                source: {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: []
                        }
                    }
                },
            });
            map.addLayer({
                id: "safestRoute",
                type: "line",
                zoom: 11,
                source: {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        properties: {},
                        geometry: {
                            type: "LineString",
                            coordinates: []
                        }
                    }
                },
            });
        })
    
    }
    handleClick(e) {
        e.target.classList.add('hide')
        document.querySelector(".search-form").classList.remove('slide-out')
        document.querySelector(".search-form").classList.add('reveal')
        document.querySelector('#map').classList.add('fix')
    }
    componentDidMount() {
        this.createMap();
    }
    componentDidUpdate(prevProps){
        if (prevProps !== this.props) {
            this.setState({ safestRoute: this.props.safestRoute, fastestRoute: this.props.fastestRoute }, this.updateRoutes(this.props.safestRoute, this.props.fastestRoute));
        }
    }
    updateRoutes(safestRoute, fastestRoute){
        const map = this.map;
        const safeColor = "#67CF9A";
        const fastColor = "red";
        this.addLineLayer("safestRoute", map, safestRoute, safeColor, 2);
        this.addLineLayer("fastestRoute", map, fastestRoute, fastColor, 0);
        // const center = route.slice().sort()[Math.floor(route.length / 2)];
        // const zoom = 14;
        // map.flyTo({ center, zoom });
    }

    
    addLineLayer(id, map,route,color,offset){
        map.removeLayer(id);
        map.removeSource(id);
        map.addLayer({
            id: id,
            type: "line",
            zoom: 11,
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