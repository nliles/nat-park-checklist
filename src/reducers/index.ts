import { AnyAction, combineReducers } from "redux";
import auth from "./auth.reducer";
import { State } from "./types";
import initialState from "./initialState";

const appReducer = combineReducers({
  auth,
});

const rootReducer = (
  state: State = initialState as State,
  action: AnyAction
) => {
  return appReducer(state, action);
};

export default rootReducer;
