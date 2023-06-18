import { combineReducers } from "redux";
import authReducer from "./auth.js";
import overviewReducer from "./overview.js";

const rootReducer = combineReducers({
  authenticateReducer: authReducer,
  overviewReducer: overviewReducer,
});

export default rootReducer;
