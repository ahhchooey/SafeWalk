// import _ from 'lodash';
let json = require('./crimes.json');

let crimes = [];

crimes = json.map((ele) => ({
    latitude: ele.latitude.slice(0,10),
    longitude: ele.longitude.slice(0,10),
    date: ele.report_datetime,
    category: ele.incident_category,
    sub_category: ele.incident_subcategory,
    intersection: ele.intersection
}))

// sorted = crimes.sort((c1, c2) => {
//     if (parseFloat(c1.latitude) > parseFloat(c2.latitude)) return 1;
//     if (parseFloat(c1.latitude) < parseFloat(c2.latitude)) return -1;

//     if (parseFloat(c1.longitude) > parseFloat(c2.longitude)) return 1;
//     if (parseFloat(c1.longitude) < parseFloat(c2.longitude)) return -1;
// })

map = crimes.filter(el => {
    // console.log(el);
    // (parseFloat(el.latitude) >= 37.7879) && (parseFloat(el.latitude) <= 37.7989) && (parseFloat(el.longitude) >= -122.4055) && (parseFloat(el.longitude) < -122.3965 )
    return ((parseFloat(el.latitude) >= 37.7879) && (parseFloat(el.latitude) <= 37.7989) && (parseFloat(el.longitude) >= -122.4055) && (parseFloat(el.longitude) < -122.3965) && el.intersection.includes('HALLECK'))
})


console.log(map)