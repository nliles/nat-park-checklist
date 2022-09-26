export const initialAuthState = {
  token: localStorage.getItem("token") || "",
};

export const initialModalState = {
  modalType: "",
};

const initialState = {
  auth: initialAuthState,
  modal: initialModalState,
};

export default initialState;
