import * as APIUtil from "../util/api_directions_util.js";

export const RECEIVE_DIRECTIONS = "RECEIVE_DIRECTIONS";
export const RECEIVE_ROUTE = "RECEIVE_ROUTE";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ROUTES = "CLEAR_ROUTES";
export const RECEIVE_CURRENT_LOCATION = "RECEIVE_CURRENT_LOCATION";

const receiveDirections = (directions) => ({
  type: RECEIVE_DIRECTIONS,
  directions: directions
})

//const receiveRoute = (route) => ({
//  type: RECEIVE_ROUTE,
//  route: route
//})

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors: errors
})
export const receiveCurrentLocation = (currentLocation) => ({
  type: RECEIVE_CURRENT_LOCATION,
  currentLocation
})
export const clearRoutes = () => ({
  type: CLEAR_ROUTES
})

export const fetchRoute = (query) => dispatch => {
  return APIUtil.fetchRoute(query)
    .then(route => {
      // console.log("route", route)
      let routeKeys = Object.keys(route);
      let ents = {};
      routeKeys.forEach(routeName => {
        ents[routeName] = {};
        ents[routeName].directions = route[routeName].map(node => { 
          let obj = {
            duration: node.duration,
            distance: node.distance,
            instruction: node.instruction
          }
          return obj;
        })
        ents[routeName].route = route[routeName].map(node => node.location);
      })

      dispatch(receiveDirections(ents));
    })
    .fail(errors => dispatch(receiveErrors(errors)));
}
