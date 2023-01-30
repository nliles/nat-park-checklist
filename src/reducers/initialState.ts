export const initialAuthState = {
  user: localStorage.getItem("user") || null,
};

const initialState = {
  auth: initialAuthState,
};

export default initialState;
