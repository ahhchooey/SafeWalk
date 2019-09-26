const mongoose = require("mongoose");
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxMapMatching = require('@mapbox/mapbox-sdk/services/map-matching')
const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoidGhlby1icm93bmUiLCJhIjoiY2sweDNxNml3MDJrczNpcWk2Y2VkcTRscSJ9.spEwua1RKRltkkhpouI7-g' })
const mapMatchingClient = mbxMapMatching(baseClient);

const Schema = mongoose.Schema;

const intersectionSchema = new Schema({
  crimeRatingNumber: {
    type: Number,
    min: 0,
    max: 100
  },
  name: {
    type: String,
    require: true,
    trim: true
  },
  custid: {
    type: Number,
    require: true
  },
  latitude: {
    type: Number,
    require: true
  },
  longitude: {
    type: Number,
    require: true
  },
  options: {
    type: Object
  }
}, {
  timestamps: true
})

intersectionSchema.index({
  name: 1,
  custid: 1,
}, {
  unique: true
})

const generateDirections = (nodes) => {
  response = {}
  // let directions;
  let waypoints = []
  nodes.forEach(node => {
    let point = {
      coordinates: [node.longitude, node.latitude],
      waypointName: node.name
    }
    waypoints.push(point)
  })

  mapMatchingClient.getMatch({
    points: waypoints,
    tidy: false,
    steps: true,
    overview: "full",
    profile: 'walking'
  })
    .send()
    .then(response => {
      let directions = []
      response.body.matchings[0].legs.forEach(leg => {
        directions.push(leg.steps)
      })
      return directions
    })
    
}


const Intersection = mongoose.model("Intersection", intersectionSchema);

module.exports = { Intersection, generateDirections };
