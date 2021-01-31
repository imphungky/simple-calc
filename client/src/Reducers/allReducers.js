import { combineReducers } from "redux";

import errReducers from "./errorReducers";
import userReducer from "./userReducer";
const allReducers = combineReducers({
  error: errReducers,
  user: userReducer,
});

export default allReducers;
