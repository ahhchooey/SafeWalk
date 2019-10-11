# [SafeWalk](https://safewalker.herokuapp.com)

------

### Tech Stack

* MongoDB / Mongoose v5.7.1
* Express v4.17.1 
* React v16.9.0 
* Node v12.10.0
* Mapbox v0.7.0


------

Welcome to SafeWalk.

SafeWalk is a map based application that creates routes based on levels of crime. Based on a users starting location, and a selected destination, SafeWalk will generate a walking route to get from point A to point B based on past levels of crime and physical distance. SafeWalk operates on a node graph that holds information on the location and cost to travel between each node. A variation of Dijkstra's algorithm will be used to calculate optimal paths and Mapbox will be used create the map and an interactive application.


------

![Screenshots of SafeWalk](https://github.com/ahhchooey/SafeWalk/blob/master/images/safewalk_img.png)


### How to Use

------

Using SafeWalk is easy. Simply go to the live site and enter a location and a destination, and click Create Route. There are toggle buttons on the side that toggle an about me or a heatmap. Turn by turn information can be clicked to toggle a dropdown of details by intersection. Routes can be canceled by clicking the X at the bottom of the screen.


### How it Works

------

* SafeWalk is built from the MERN (MongoDB, Express, React, Node.js) stack.
* MongoDB holds our node graph. Each node hold information about the other nodes they are connected to, as well as the cost it requires to traverse to these adjacent nodes. Each node also holds coordinates and some crime information about the area.
* Mongoose allows for communication between Express and Mongo. We use Mongoose to create a reachable api route. When the route is called it uses the node graph in the database and Dijkstra's algorithm to find the shortest path when taking into account distance between two nodes and the amount of dangerous crime at each node.
* The user interface is built with React and Redux, so that we only render components that we need. Redux is used in our case to control our UI elements, as SafeWalk does not use front end routing.
* The map is rendered with Mapbox. The routes are generated with a node list created from the backend and the Mapbox API.
* The heatmap and crime information are generated through Mapbox layers.

------


### Example Code

------

An example of a dummy backend route that generates a node list between node 1 and node 100.
```js
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
```

An example of map layering to create a dynamic and interesting map render.
```js
map.on('load', () => {
    map.addSource("sf-neighborhoods", {
        type: 'geojson',
        data: SF_NEIGHBORHOODS
    });
    map.addLayer({
        id: 'sf-neighborhoods-fill',
        source: 'sf-neighborhoods',
        type: 'fill',
        paint: {
            'fill-outline-color': '#0040c8',
            'fill-color': '#fff',
            'fill-opacity': 0
        }
    });
    map.addLayer({
        id: 'sf-neighborhoods-outline',
        source: 'sf-neighborhoods',
        type: 'line',
        paint: {
            'line-width': 2,
            'line-color': 'white'
        }
    });
    map.addSource('crime', {
        "type": "geojson",
        "data": NULL_CRIMES
    });
    map.addLayer({
        "id": "crimes-heat",
        "type": "heatmap",
        "source": "crime",
        "maxzoom": 16,
    }, 'waterway-label');
...
```

### Contributors

------

[Alex Chui](https://github.com/ahhchooey) |
[Jimmy Pham](https://github.com/jipham510) |
[Stanton Huang](https://github.com/aethervial) |
[Theodore Browne](https://github.com/theo-browne)

