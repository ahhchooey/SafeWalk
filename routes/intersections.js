const router = require("express").Router();
const Intersection = require("../models/intersection.model.js");

router.route("/test").get((req, res) => {
  res.json({msg: "this is a testooo"})
})

router.route("/").get((req, res) => {
  //this is where logic goes to filter and sort things
  Intersection.find()
    .then(intersections => res.json("hi"))
    .catch(err => res.status(404).json({message: "Error: " + err}))
})

module.exports = router;
