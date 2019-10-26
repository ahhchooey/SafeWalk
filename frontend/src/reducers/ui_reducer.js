import {
    TOGGLE_SHOW_SEARCH,
    TOGGLE_ALL_DIRECTIONS,
    TOGGLE_TRIP_INFO,
    TOGGLE_TURN_BY_TURN,
    TOGGLE_DZ,
    SET_ROUTE,
    TOGGLE_HEAT,
    CLEAR_ROUTE,
    SET_MAP,
    TOGGLE_AUTHORS,
    TOGGLE_TURN_BY_TURN_DROP_DOWN
} from '../actions/ui_actions';

let defaultState = {
    showSearch: false,
    showAllDirections: false,
    showTripInfo: false,
    showTurnByTurn: false,
    showDZ: false,
    showAuthor: false,
    showTBTDropDown: false,
    showHeat: true,
    setRoute: null,
    setMap: false
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
        case TOGGLE_AUTHORS:
            newState.showAuthor = !newState.showAuthor;
            return newState;
        case TOGGLE_TURN_BY_TURN_DROP_DOWN:
            newState.showTBTDropDown = !newState.showTBTDropDown;
            return newState;
        case SET_ROUTE:
            newState.setRoute = action.str;
            return newState;
        case TOGGLE_HEAT:
            newState.showHeat = !newState.showHeat;
            return newState;
        case SET_MAP:
            newState.setMap = true;
            return newState;
        case CLEAR_ROUTE:
            let thing = Object.assign({}, defaultState, { setMap: true, showSearch: true})
            return thing;
        default:
            return state;
    }
}

export default uiReducer;
