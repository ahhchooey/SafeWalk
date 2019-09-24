const mongoose = require("mongoose");


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

const Intersection = mongoose.model("Intersection", intersectionSchema);
module.exports = Intersection;
