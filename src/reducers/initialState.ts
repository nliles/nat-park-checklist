export const initialAuthState = {
  token: sessionStorage.getItem("token") || "",
};

export const initialModalState = {
  modalType: "",
};

const initialState = {
  auth: initialAuthState,
  modal: initialModalState,
};

export default initialState;
