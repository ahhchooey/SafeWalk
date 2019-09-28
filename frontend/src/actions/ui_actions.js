export const TOGGLE_SHOW_SEARCH = "TOGGLE_SHOW_SEARCH";
export const TOGGLE_ALL_DIRECTIONS = "TOGGLE_ALL_DIRECTIONS";
export const TOGGLE_TRIP_INFO = "TOGGLE_TRIP_INFO";
export const TOGGLE_TURN_BY_TURN = "TOGGLE_TURN_BY_TURN";
export const TOGGLE_DZ = "TOGGLE_DZ";
export const SET_ROUTE = "SET_ROUTE";
export const TOGGLE_HEAT = "TOGGLE_HEAT"

export const toggleShowSearch = () => ({
    type: TOGGLE_SHOW_SEARCH
})

export const toggleAllDirections = () => ({
    type: TOGGLE_ALL_DIRECTIONS
})

export const toggleTripInfo = () => ({
    type: TOGGLE_TRIP_INFO
})

export const toggleTurnByTurn = () => ({
    type: TOGGLE_TURN_BY_TURN
})

export const toggleDangerZone = () => ({
    type: TOGGLE_DZ
})

export const toggleHeat = () => ({
    type: TOGGLE_HEAT
})

export const setRoute = str => ({
    type: SET_ROUTE,
    str: str
})