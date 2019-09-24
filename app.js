const express = require("express");
const mongoose = require("mongoose");
const db = require('./config/keys').mongoURI;
const intersections = require("./routes/api/intersections.js");
const Intersection = require("./models/intersection.model.js");
const seed = require("./node_seed.js");


const app = express();
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use("/api/intersections", intersections);
app.use(express.json());


app.get("/", (req, res) => res.send(seed));

//Intersection.insertMany(Object.values(seed), (err) => {
//  if (err) throw err;
//})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
