import type { AnyAction } from "redux";
import { SHOW_MODAL, HIDE_MODAL } from "actions";
import { State } from "./types";
import initialState from "./initialState";

const modalReducer = (
  state: State = initialState as State,
  action: AnyAction
) => {
  switch (action.type) {
    case SHOW_MODAL:
      return action.modalType;
    case HIDE_MODAL:
      return "";
    default:
      return state;
  }
};

export default modalReducer;
