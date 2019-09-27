const router = require("express").Router();
// const $ = require("jquery")
// const soda = require('soda-js');
// const consumer = new soda.Consumer('explore.data.gov')
const axios = require('axios')

router.route("/heatmap").get((req, res) => {

    axios.get('https://data.sfgov.org/resource/wg3w-h783.geojson')
        .then((data) => {
            console.log(data.data.features)
            let crimes = [];

            crimes = data.data.features.filter(el => el.properties.longitude).map((ele) => ({
                latitude: ele.properties.latitude.slice(0, 10) ,
                longitude: ele.properties.longitude.slice(0, 10),
                date: ele.properties.report_datetime,
                category: ele.properties.incident_category,
                sub_category: ele.properties.incident_subcategory,
                intersection: ele.properties.intersection
            }))
            // console.log(crimes)
            res.send({type: crimes})
        }, (err) => {
            res.json({message: "nah"})
            console.log('nah')
        } )

})



module.exports = router;