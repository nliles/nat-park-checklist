import type { AnyAction } from "redux";
import { AuthState } from "./types";
import { initialAuthState } from "./initialState";
import { IS_AUTHENTICATED, NOT_AUTHENTICATED } from "actions";

const auth = (state: AuthState = initialAuthState, action: AnyAction) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        token: action.token,
      };
    case NOT_AUTHENTICATED:
      return {
        token: null,
      };
    default:
      return state;
  }
};
export default auth;
