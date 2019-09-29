// import _ from 'lodash';
let json = require('./crimes.json');
const crimeRating = require("../crime_rating.js");
const fs = require("fs");
const lodash = require("lodash");
const seed = require("../node_seed.js")

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
    return ((parseFloat(el.latitude) >= 37.7879) && (parseFloat(el.latitude) <= 37.7989) && (parseFloat(el.longitude) >= -122.4055) && (parseFloat(el.longitude) < -122.3965)
    )});


const categories = ["Lost", "Theft", "Stolen", "Malicious Mischief", "Theft", 
"Miscellaneous", "Robbery", "Assault", "Suspicious", "Fraud", "Traffic", "Disorderly", 
"Weapons", "Burglary", "Drug", "Warrant", "Missing", "Offences", "Embezzlement", 
"Forgery", "Vandalism", "Intimination", "Liquor", "Other"]

let counter = {};

map.forEach(thing => {
  if (counter[thing.intersection] === undefined) {
    counter[thing.intersection] = {};
    categories.forEach(crime => {
      counter[thing.intersection][crime] = 0
    })
  };
  
  for (let i = 0; i < categories.length; i++) {
    if (thing.category.includes(categories[i])) {
      counter[thing.intersection][categories[i]]++
    }
    if (thing.sub_category.includes(categories[i])) {
      counter[thing.intersection][categories[i]]++
    }
  }
})
let keys = Object.keys(counter);
keys.forEach(key => {
  let innerKeys = Object.keys(counter[key]);
  innerKeys.filter(innerKey => {
    if (counter[key][innerKey] === 0) delete counter[key][innerKey];
  })
})

//console.log("crimes by intersection", counter);

let featureCollection = {
  "type": "FeatureCollection",
  "features": []
}

const dummyObject = {
  "type": "Feature",
  "name": "",
  "geometry": {
    "type": "Point",
    "coordinates": []
  },
  "properties": {}
}

map.forEach(intersection => {
  let obj = lodash.merge({}, dummyObject);
  obj.name = intersection.intersection;
  if (featureCollection.features.some(inter => {
    return inter.name === obj.name
  })) return;
  obj.geometry.coordinates = [intersection.longitude, intersection.latitude];
  obj.properties = counter[obj.name];
  featureCollection.features.push(obj);
})


let ints = Object.values(seed);
featureCollection.features.forEach(inter => {
  let i = ints.filter(int => {
    return int.name === inter.name.split("\\").join("\\\\")
  })[0];
  inter.properties.crimeRating = i ? i.crimeRating : 0;
})

//console.log(featureCollection.features.length)

//let featureCollectionJSON = JSON.stringify(featureCollection);
//fs.writeFile("featureCollection.json", featureCollectionJSON, (err, result) => {
//  if(err) console.log('error', err);
//});

//for (intersection in counter) {
//  let total = 0;
//  let crimes = Object.keys(counter[intersection]);
//  crimes.forEach(crime => {
//    total += crimeRating[crime] * counter[intersection][crime] || 0;
//  })
//  counter[intersection] = total
//}

//console.log("crimeRating by intersection", counter);


// THIS IS NOTHING
//let counter2 = {};
//categories.forEach(crime => {
//  counter2[crime] = 0
//})
//
//
//map.forEach(thing => {
//  for (let i = 0; i < categories.length; i++) {
//    if (thing.category.includes(categories[i])) {
//      counter2[categories[i]]++;
//    }
//  }
//})
//
//console.log("crime counter", counter2);

module.exports = {featureCollection};
