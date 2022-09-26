import { ModalNameType } from "components/ui/Modal/types";

export type AuthState = {
  token: string;
};

export type ModalState = {
  modalType: ModalNameType;
};

export type State = {
  auth: AuthState;
  modal: ModalState;
};
