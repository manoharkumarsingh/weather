import { combineReducers } from "redux";
import weather from "./weather";

const allReducers = combineReducers( {
    weather : weather
})

export default allReducers;