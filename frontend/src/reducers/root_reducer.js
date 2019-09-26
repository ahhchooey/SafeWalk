import {combineReducers} from "redux";
import uiReducer from './ui_reducer';
import directionsReducer from "./directions_reducer.js";


const rootReducer = combineReducers({
  ui: uiReducer,
  entities: directionsReducer
});

export default rootReducer;
