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

  let start = closest(req.query.query.start)
  let destination = closest(req.query.query.destination)
  let directions
  Intersection.find()
    .then(async intersections => {
      const fastmap = new Graph();
      const safemap = new Graph()
      intersections.forEach(inter => {

        fastmap.addNode(String(inter.custid), inter.options)
        
        let op = Object.assign({}, inter)
        let newOptions = Object.assign({}, inter.options)
        let keys = Object.keys(newOptions);
        keys.forEach(key => {
          newOptions[key] = newOptions[key] * 1 + 10 * (op._doc.crimeRating || 0);
        })
  
        safemap.addNode(String(inter.custid), newOptions)
      })
      const fastpath = fastmap.path(String(start), String(destination));
      const safepath = safemap.path(String(start), String(destination));
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

      const saferoute = await getData(safepath);
      const fastroute = await getData(fastpath)
      return [saferoute, fastroute]
    })
    .then((route) => {
      // console.log(route)
      let safewaypoints = []
      let fastwaypoints = []
       let start = {
         coordinates: [parseFloat(req.query.query.start.longitude), parseFloat(req.query.query.start.latitude) ],
         waypointName: 'Start'
       }
       safewaypoints.push(start)
       fastwaypoints.push(start)
     
      route[0].forEach(node => {
        let point = {
          coordinates: [node.longitude, node.latitude],
          waypointName: node.name
        }
        safewaypoints.push(point)
      })
      route[1].forEach(node => {
        let point = {
          coordinates: [node.longitude, node.latitude],
          waypointName: node.name
        }
        fastwaypoints.push(point)
      })
       let destination = {
         coordinates: [parseFloat(req.query.query.destination.longitude), parseFloat(req.query.query.destination.latitude)],
         waypointName: 'Destination'
       }
       fastwaypoints.push(destination)
       safewaypoints.push(destination)
       

       const fetchDirections = async(waypoints) => {
         return await mapMatchingClient.getMatch({
           points: waypoints,
           tidy: false,
           steps: true,
           overview: "full",
           profile: 'walking'
         })
           .send()
       }
       const parseDirections = async(route) => {
         return await Promise.resolve(route.then(response => {
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
           })
           return directions
         }))
       }

       const sendDirections = (safePath, fastPath) => {
         safePath.then((points) => {
           return points 
         }).then(points => {
             (fastPath.then((fpoints) => {
            //  console.log({ 'safest': points, 'fastest': fpoints })
             res.json({ 'safest': points, 'fastest': fpoints })
           }))
         })
  
       }
      let fastDir = parseDirections(fetchDirections(fastwaypoints))
      let safeDir = parseDirections(fetchDirections(safewaypoints))
      sendDirections(safeDir, fastDir)
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
