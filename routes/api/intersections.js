const router = require("express").Router();
const Intersection = require("../../models/intersection.model.js");
const Graph = require("node-dijkstra");


router.route("/test").get((req, res) => {
  res.json({msg: "this is a test"})
})

router.route("/all").get((req, res) => {
  Intersection.find()
    .then(intersections => res.json(intersections))
    .catch(err => res.status(404).json({message: "intersections cannot be found"}))
})

router.route("/shortest").get((req, res) => {
  Intersection.find()
    .then(async intersections => {
      const map = new Graph();
      intersections.forEach(inter => {
        map.addNode(String(inter.custid), inter.options)
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
