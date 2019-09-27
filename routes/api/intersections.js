const router = require("express").Router();
const {Intersection, generateDirections} = require("../../models/intersection.model.js");
const Graph = require("node-dijkstra");
const closest = require("../../Parse/geolocation")
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxMapMatching = require('@mapbox/mapbox-sdk/services/map-matching')
const baseClient = mbxClient({ accessToken: 'pk.eyJ1IjoidGhlby1icm93bmUiLCJhIjoiY2sweDNxNml3MDJrczNpcWk2Y2VkcTRscSJ9.spEwua1RKRltkkhpouI7-g' })
const mapMatchingClient = mbxMapMatching(baseClient);

router.route("/test").get((req, res) => {
  res.json({msg: "this is a test"})
})

router.route("/all").get((req, res) => {
  Intersection.find()
    .then(intersections => res.json(intersections))
    .catch(err => res.status(404).json({message: "intersections cannot be found"}))
})

router.route("/shortest").get((req, res) => {
  // console.log(req)
  let start = closest(req.query.query.start)
  let destination = closest(req.query.query.destination)
  let directions
  // res.json(start)
  // console.log(req)
  Intersection.find()
    .then(async intersections => {
      const map = new Graph();
      intersections.forEach(inter => {
        map.addNode(String(inter.custid), inter.options)
      })
      const path = map.path(String(start), String(destination));
      const fetchIntersection = id => {
        return Promise.resolve(Intersection.findOne({custid: id}))
      }

      const asyncFunction = async (id) => {
        return await fetchIntersection(id);
      }

      const getData = async(array) => {
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
      // let start = {
      //   coordinates: [parseFloat(req.query.query.start.longitude), parseFloat(req.query.query.start.latitude) ],
      //   waypointName: 'point-a',
      //   isWaypoint: true
      // }
      
      // waypoints.push(start)
     
      route.forEach(node => {
        let point = {
          coordinates: [node.longitude, node.latitude],
          waypointName: node.name
        }
       
        waypoints.push(point)
      })
      // let destination = {
      //   coordinates: [parseFloat(req.query.query.destination.longitude), parseFloat(req.query.query.destination.latitude)],
      //   isWaypoint: true,
      //   waypointName: 'point-o'
      // }
      // waypoints.push(destination)
      // console.log(waypoints)
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
            directions.push(leg.steps)
          })
          console.log(directions)
           res.json(directions)
        })
    })
    .catch(err => res.status(400).json({message: "intersections cannot be found"}))
})

router.route("/safest").get((req, res) => {
  Intersection.find()
    .then(async (intersections) => {
      const map = new Graph();
      intersections.forEach(inter => {
        let newOptions = Object.assign({}, inter.options)
        let keys = Object.keys(newOptions);
        keys.forEach(key => {
          newOptions[key] = newOptions[key] * 1 + (inter.crimeRating || 0);
        })
        map.addNode(String(inter.custid), newOptions)
      })
      const path = map.path("1", "100");

      const fetchIntersection = id => {
        return Promise.resolve(Intersection.findOne({custid: id}))
      }

      const asyncFunction = async (id) => {
        return await fetchIntersection(id);
      }

      const getData = async(array) => {
        return await Promise.all(array.map(id => (
          asyncFunction(parseInt(id))
        )))
      }

      const route = await getData(path);
      res.json(route);
    })
    .catch(err => res.status(404).json({message: "intersections cannot be found"}))
})

module.exports = router;
