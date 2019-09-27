import {
    TOGGLE_SHOW_SEARCH,
    TOGGLE_ALL_DIRECTIONS,
    TOGGLE_TRIP_INFO,
    TOGGLE_TURN_BY_TURN,
    TOGGLE_DZ
} from '../actions/ui_actions';

let defaultState = {
    showSearch: true,
    showAllDirections: false,
    showTripInfo: false,
    showTurnByTurn: false,
    showDZ: false,
}

const uiReducer = (state = defaultState, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state);
    switch (action.type) {
        case TOGGLE_SHOW_SEARCH:
            newState.showSearch = !newState.showSearch;
            return newState;
        case TOGGLE_ALL_DIRECTIONS:
            newState.showAllDirections = !newState.showAllDirections;
            return newState;
        case TOGGLE_TRIP_INFO:
            newState.showTripInfo = !newState.showTripInfo;
            return newState;
        case TOGGLE_TURN_BY_TURN:
            newState.showTurnByTurn = !newState.showTurnByTurn;
            return newState;
        case TOGGLE_DZ:
            newState.showDZ = !newState.showDZ;
            return newState;
        default:
            return state;
    }
}

export default uiReducer;