import hero from "./hero";
import graphReducer from "./graphReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  hero,
  graphReducer,
});

export default rootReducer;
