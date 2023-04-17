import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import allReducers from "./reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
const store=createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));
export default store;