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
    .then(intersections => {
      const map = new Graph();
      intersections.forEach(inter => {
        map.addNode(String(inter.custid), inter.options)
      })
      res.json(map.path("1", "18", {cost: true}))
    })
    .catch(err => res.status(404).json({message: "intersections cannot be found"}))
})

router.route("/safest").get((req, res) => {
  Intersetion.find()
    .then((intersections) => {
      const map = new Graph();
      intersections.forEach(inter => {
        //change the options hash
        map.addNode(String(inter.custid), inter.options)
      })
      res.json(map.path("1", "18", {cost: true}))
    })
    .catch(err => res.status(404).json({message: "intersections cannot be found"}))
})

module.exports = router;
