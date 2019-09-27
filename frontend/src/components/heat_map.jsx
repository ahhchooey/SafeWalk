import React from 'react';
import { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import './stylesheets/map.scss'
import SF_NEIGHBORHOODS from '../data/feature-example-sf'

class HeatMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: "",
            route: []
        }

    }
    createMap() {
        // const centerOnLoad = [-122.401672, 37.794418];

        const centerOnLoad = [-122.440066, 37.749422]; //random center
        const zoom = 14;
        const bounds = [
            [-123.676849, 36.506627], // Southwest coordinates
            [-121.366776, 38.868049]  // Northeast coordinates 
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
            map.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            }));
            map.addSource('crime', {
                "type": "geojson",
                "data": "https://data.sfgov.org/resource/wg3w-h783.geojson"
            });
            map.addLayer({
                "id": "earthquakes-heat",
                "type": "heatmap",
                "source": "crime",
                "maxzoom": 18,
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
        
        })

    }

    componentDidMount() {
        this.createMap();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.route !== this.props.route) {
            this.setState({ route: this.props.route }, this.updateRoute);
        }
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
export default HeatMap;