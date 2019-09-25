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
    return ((parseFloat(el.latitude) >= 37.7879) && (parseFloat(el.latitude) <= 37.7989) && (parseFloat(el.longitude) >= -122.4055) && (parseFloat(el.longitude) < -122.3965)
    )});


const categories = ["Lost", "Theft", "Stolen", "Malicious Mischief", "Theft", 
"Miscellaneous", "Robbery", "Assault", "Suspicious", "Fraud", "Traffic", "Disorderly", 
"Weapons", "Burglary", "Drug", "Warrant", "Missing", "Offences", "Embezzlement", 
"Forgery", "Vandalism", "Intimination", "Liquor", "Other"]

//let counter = {};
//map.forEach(thing => {
//  if (counter[thing.intersection] === undefined) counter[thing.intersection] = {};
//  if (counter[thing.intersection][thing.category] === undefined) counter[thing.intersection][thing.category] = 0;
//  if (counter[thing.intersection][thing.sub_category] === undefined) counter[thing.intersection][thing.sub_category] = 0;
//  counter[thing.intersection][thing.category]++;
//  counter[thing.intersection][thing.sub_category]++;
//})
//console.log("crimes by intersection", counter);

let counter2 = {};
categories.forEach(crime => {
  counter2[crime] = 0
})


map.forEach(thing => {
  for (let i = 0; i < categories.length; i++) {
    if (thing.category.includes(categories[i])) {
      counter2[categories[i]]++;
    }
  }
})

console.log("crime counter", counter2);
