const seed = require('../node_seed');
// import seed from '../node_seed';

// const options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
// };


// latitude: 37.7988017
// Longitude: -122.40145079999999
// let temp;

// function success(pos) {
//     let crd = pos.coords;
//     temp = pos
//     console.log(crd);
//     console.log('Your current position is:');
//     console.log(`Latitude : ${crd.latitude}`);
//     console.log(`Longitude: ${crd.longitude}`);
// }

// function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
// }

function closest(pos) {
    let blah = [];
    console.log(pos);
    for (let intersection in Object.values(seed)) {
        temp = intersection.toString();
        // console.log(typeof temp);
        // console.log(temp);
        // console.log(intersection === temp);
        // console.log(Object.values(seed)[temp])
        let dist = Math.pow((Math.pow((pos.latitude - Object.values(seed)[temp].latitude), 2) + Math.pow((pos.longitude - Object.values(seed)[temp].longitude), 2)), .5);
        blah.push(dist)
        // console.log(dist)
        // console.log(seed[intersection]);
        // console.log(dist);
    }
    // console.log(blah);
    // let bloo = Math.min(blah)
    let bloo = Math.min(...blah)
    return blah.indexOf(bloo) + 1;
}

let pos =  {latitude: 37.7987445, longitude: -122.40145999999999}

// navigator.geolocation.getCurrentPosition(success, error, options);
console.log(closest(pos));
