export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";

export const loginSuccess = (token: string) => ({
  type: IS_AUTHENTICATED,
  token,
});

export const logoutSuccess = () => ({
  type: NOT_AUTHENTICATED,
});
