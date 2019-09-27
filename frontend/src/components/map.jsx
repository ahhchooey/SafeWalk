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
            route: [],
            userLocation: []
        }
        this.receiveCurrentLocation = this.props.receiveCurrentLocation;
        this.handleClick = this.handleClick.bind(this);
        this.createMap = this.createMap.bind(this);
        this.updateRoute = this.updateRoute.bind(this);
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
                id: "route",
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
        if(prevProps.route !== this.props.route) {
            this.setState({ route: this.props.route }, this.updateRoute);
        }
     }
    updateRoute() {
        const map = this.map;
        const route = this.state.route;
        const center = route.slice().sort()[Math.floor(route.length / 2)];
        const zoom = 14;
        //will probably need to remove layer, need to test once global coordinates state added
        // map.on('load', function () {
            map.flyTo({ center, zoom });
            map.removeLayer("route");
            map.removeSource("route");

            map.addLayer({
                id: "route",
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
                    "line-color": "#67CF9A",
                    "line-width": 4
                }
            });
        // })
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