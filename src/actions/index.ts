import { ModalNameType } from "components/ui/Modal/types";

export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";

export const openModal = (modalType: ModalNameType) => ({
  type: SHOW_MODAL,
  modalType,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});

export const loginSuccess = (token: string) => ({
  type: IS_AUTHENTICATED,
  token,
});

export const logoutSuccess = () => ({
  type: NOT_AUTHENTICATED,
});
