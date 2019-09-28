const mongoose = require("mongoose");
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxMapMatching = require('@mapbox/mapbox-sdk/services/map-matching')
const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoidGhlby1icm93bmUiLCJhIjoiY2sweDNxNml3MDJrczNpcWk2Y2VkcTRscSJ9.spEwua1RKRltkkhpouI7-g' })
const mapMatchingClient = mbxMapMatching(baseClient);

const Schema = mongoose.Schema;

const intersectionSchema = new Schema({
  crimeRating: {
    type: Number,
    min: 0
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

const generatePath = (rating) => {
  // console.log(req)
  let start = closest(req.query.query.start)
  let destination = closest(req.query.query.destination)
  let directions
  Intersection.find()
    .then(async intersections => {
      const map = new Graph();
      intersections.forEach(inter => {
        map.addNode(String(inter.custid), inter.options)
      })
      const path = map.path(String(start), String(destination));
      const fetchIntersection = id => {
        return Promise.resolve(Intersection.findOne({ custid: id }))
      }

      const asyncFunction = async (id) => {
        return await fetchIntersection(id);
      }

      const getData = async (array) => {
        return await Promise.all(array.map(id => (
          asyncFunction(parseInt(id))
        )))
      }

      const route = await getData(path);
      // res.json(route);
      return route
    })
    .then((route) => {
      let waypoints = []
      let start = {
        coordinates: [parseFloat(req.query.query.start.longitude), parseFloat(req.query.query.start.latitude)],
        waypointName: 'Start'
      }

      waypoints.push(start)

      route.forEach(node => {
        let point = {
          coordinates: [node.longitude, node.latitude],
          waypointName: node.name
        }
        waypoints.push(point)
      })
      let destination = {
        coordinates: [parseFloat(req.query.query.destination.longitude), parseFloat(req.query.query.destination.latitude)],
        waypointName: 'Destination'
      }
      waypoints.push(destination)

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
            leg.steps.forEach(step => {
              let obj = {
                location: step.maneuver.location,
                instruction: step.maneuver.instruction,
                distance: step.distance,
                duration: step.duration
              }
              directions.push(obj)
            })
            // directions.push(leg.steps)
          })
          res.json(directions)
        })
    })
   
}

const Intersection = mongoose.model("Intersection", intersectionSchema);

module.exports = { Intersection, generateDirections };
