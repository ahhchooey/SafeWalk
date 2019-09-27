import {RECEIVE_DIRECTIONS, RECEIVE_ROUTE, CLEAR_ROUTES} from "../actions/directions_actions.js";


const _nullState = {
  safest: {},
  fastest: {}
}

const directionsReducer = (state = _nullState, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_DIRECTIONS:
      return Object.assign({}, state, {
        safest: action.directions.safest,
        fastest: action.directions.fastest 
      })
    case RECEIVE_ROUTE:
      return Object.assign({}, state, {route: action.route})
    case CLEAR_ROUTES:
      return _nullState;
    default: 
      return state;
  }
}

export default directionsReducer;
