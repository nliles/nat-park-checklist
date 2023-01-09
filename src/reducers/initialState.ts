export const initialAuthState = {
  token: sessionStorage.getItem("token") || "",
};

const initialState = {
  auth: initialAuthState,
};

export default initialState;
