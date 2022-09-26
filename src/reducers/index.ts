import { AnyAction, combineReducers } from "redux";
import auth from "./auth.reducer";
import modal from "./modal.reducer";
import { State } from "./types";
import initialState from "./initialState";

const appReducer = combineReducers({
  auth,
  modal,
});

const rootReducer = (
  state: State = initialState as State,
  action: AnyAction
) => {
  return appReducer(state, action);
};

export default rootReducer;
