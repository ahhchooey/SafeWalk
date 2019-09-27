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

const receiveRoute = (route) => ({
  type: RECEIVE_ROUTE,
  route: route
})
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


export const fetchRoute = (route, query) => dispatch => {
  return APIUtil.fetchRoute(route, query)
    .then(nodes => {
      let directions = nodes.map(node => {
        let obj = {
          duration: node.duration,
          distance: node.distance,
          instruction: node.instruction
        };
        return obj;
      })
      let route = nodes.map(node => node.location);
      dispatch(receiveDirections(directions));
      dispatch(receiveRoute(route));
    })
    .fail(errors => dispatch(receiveErrors(errors)));
}
