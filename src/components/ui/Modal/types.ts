import LoginForm from "modals/login/LoginFormContainer";

export const ModalName = {
  LOGIN_MODAL: "LOGIN_MODAL",
};

export const ModalContentLabel = {
  [ModalName.LOGIN_MODAL]: "Login and registration modal",
};

export type ModalNameType = typeof ModalName[keyof typeof ModalName];

export const ModalComponents = {
  [ModalName.LOGIN_MODAL]: LoginForm,
} as const;

export type ModalComponentsType =
  typeof ModalComponents[keyof typeof ModalComponents];
