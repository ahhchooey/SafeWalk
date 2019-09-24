const router = require("express").Router();
const Intersection = require("../../models/intersection.model.js");

router.route("/test").get((req, res) => {
  res.json({msg: "this is a test"})
})

router.route("/all").get((req, res) => {
  Intersection.find()
    .then(intersections => res.json(intersections))
    .catch(err => res.status(404).json({message: "intersections cannot be found"}))
})

router.route("/").get((req, res) => {
  //this is where logic goes to filter and sort things
  Intersection.find()
    .then(intersections => res.json(intersections))
    .catch(err => res.status(404).json({message: "intersections cannot be found"}))
})

module.exports = router;
