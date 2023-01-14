export const initialAuthState = {
  token: sessionStorage.getItem("token") || null,
};

const initialState = {
  auth: initialAuthState,
};

export default initialState;
