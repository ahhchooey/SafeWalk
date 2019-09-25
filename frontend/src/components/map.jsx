import React from 'react'
import { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import MAP_STYLE from './map-style'
import './stylesheets/map.scss'
const TOKEN = 'pk.eyJ1Ijoia2F5bjAyIiwiYSI6ImNrMHduZmNrMTAyZHMzbnM5enVmdDN0dWkifQ._BNoD6MIe93DBi-0R-pCkQ';

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            viewport: {
                // width: 400,
                // height: 400,
                latitude: 37.794418,
                longitude: -122.401672,
                zoom: 14,
                bearing: 0,
                pitch: 0
            }
        };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        e.target.classList.add('hide')
        document.querySelector(".search-form").classList.add('show')
    }
    render() {
        return (
            <div className='map'>
                <div className='search-link'>
                    <input type="text" placeholder='Where to?' onFocus={this.handleClick} onBlur={this.hide}/>
                </div>
            <ReactMapGL
                className='mapbox'
                width='100vw'
                height='100vh'
                mapStyle={MAP_STYLE}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}
                mapboxApiAccessToken={TOKEN}
            />
            </div>
        );
    }
}
export default Map;
// <!DOCTYPE html>
// <html>
// <head>
// <meta charset='utf-8' />
// <title>Display a map</title>
// <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
// <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.js'></script>
// <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.3.1/mapbox-gl.css' rel='stylesheet' />
// <style>
//     body { margin:0; padding:0; }
//     #map { position:absolute; top:0; bottom:0; width:100%; }
// </style>
// </head>
// <body>
 
// <div id='map'></div>
// <script>
//     mapboxgl.accessToken = 'pk.eyJ1Ijoia2F5bjAyIiwiYSI6ImNrMHdtOG1mazFibGIzbG52OWl3cTFuaHAifQ.1BUt79A5o-UITa1-aP0bJw';
//     var bounds = [
//         [-122.429477, 37.775111], // Southwest coordinates
//         [-122.371415, 37.816064]  // Northeast coordinates
//     ];
//     var map = new mapboxgl.Map({
//         container: 'map', // container id
//         style: 'mapbox://styles/kayn02/ck0wnpulx5a6i1cqiwvav4tae', // stylesheet location
//         center: [-122.401672, 37.794418], // starting position [lng, lat]
//         zoom: 16, // starting zoom
//         maxBounds: bounds
//     });
//     map.on('load', function () {

//         map.addLayer({
//             'id': 'fidi',
//             'type': 'fill',
//             'source': {
//                 'type': 'geojson',
//                 'data': {
//                     'type': 'Feature',
//                     'geometry': {
//                         'type': 'Polygon',
//                         'coordinates': [[
//                             [-122.395208, 37.794190], //bottom right coord
//                             [-122.396768, 37.795532], 
//                             [-122.397818, 37.798528], 
//                             [-122.398198, 37.798924], 
//                             [-122.407034, 37.797824],
//                             [-122.404774, 37.786633],
//                             [-122.395208, 37.794190] //bottom right coord
//                         ]]
//                     }
//                 }
//             },
//             'layout': {},
//             'paint': {
//                 'fill-color': '#088',
//                 'fill-opacity': 0.2,
//                 // 'border': '1px black solid'
//             }
//         });
//     });
// </script>
 
// </body>
// </html>