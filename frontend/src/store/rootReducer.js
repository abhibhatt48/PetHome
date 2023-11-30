import { combineReducers } from "redux";

import authReducer from "./Auth/reducer";
import petReducer from "./Pets/reducer";

const rootReducer = combineReducers({
  authReducer,
  petReducer,
});

export default rootReducer;
