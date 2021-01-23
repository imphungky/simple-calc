import userReducer from "./userReducer";
import errReducers from "./errorReducers";
import {combineReducers} from "redux";
const allReducers = combineReducers({
    error: errReducers,
    user: userReducer
});

export default allReducers;