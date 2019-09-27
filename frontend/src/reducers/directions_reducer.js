import { RECEIVE_DIRECTIONS, RECEIVE_ROUTE, RECEIVE_CURRENT_LOCATION, CLEAR_ROUTES} from "../actions/directions_actions.js";


const _nullState = {
  directions: [],
  route: [],
  currentLocation: []
}

const directionsReducer = (state = _nullState, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_DIRECTIONS:
      return Object.assign({}, state, {directions: action.directions})
    case RECEIVE_ROUTE:
      return Object.assign({}, state, {route: action.route})
    case RECEIVE_CURRENT_LOCATION:
      return Object.assign({}, state, { currentLocation: action.currentLocation })
    case CLEAR_ROUTES:
      return _nullState;
    default: 
      return state;
  }
}

export default directionsReducer;
