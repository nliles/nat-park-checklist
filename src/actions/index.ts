export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";

export const loginSuccess = (user: string) => ({
  type: IS_AUTHENTICATED,
  user,
});

export const logoutSuccess = () => ({
  type: NOT_AUTHENTICATED,
});
