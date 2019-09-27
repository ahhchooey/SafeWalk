import {RECEIVE_DIRECTIONS, RECEIVE_ROUTE, CLEAR_ROUTES} from "../actions/directions_actions.js";


const _nullState = {
  directions: [],
  route: []
}

const directionsReducer = (state = _nullState, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_DIRECTIONS:
      return Object.assign({}, state, {directions: action.directions})
    case RECEIVE_ROUTE:
      return Object.assign({}, state, {route: action.route})
    case CLEAR_ROUTES:
      return _nullState;
    default: 
      return state;
  }
}

export default directionsReducer;
