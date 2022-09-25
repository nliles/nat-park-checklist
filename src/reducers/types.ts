import { ModalNameType } from "components/ui/Modal/types";

export type AuthState = {
  authenticated: boolean;
};

export type ModalState = {
  modalType: ModalNameType;
};

export type State = {
  auth: AuthState;
  modal: ModalState;
};
