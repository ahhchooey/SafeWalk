const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const intersectionSchema = new Schema({
  position: {
    type: Object,
    require: true,
    unique: true
  },
  connectedNodeIds: {
    type: Array
  },
  crimeRatingNumber: {
    type: Number,
    min: 0,
    max: 100
  },
  name: {
    type: String,
    require: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
})

const Intersection = mongoose.model("Intersection", intersectionSchema);
module.exports = Intersection;
