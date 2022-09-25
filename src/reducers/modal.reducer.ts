import type { AnyAction } from "redux";
import { SHOW_MODAL, HIDE_MODAL } from "actions";
import { ModalState } from "./types";
import { initialModalState } from "./initialState";

const modalReducer = (
  state: ModalState = initialModalState,
  action: AnyAction
) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
      };
    case HIDE_MODAL:
      return {
        modalType: "",
      };
    default:
      return state;
  }
};

export default modalReducer;
