const copy = {
  emailRequired: "Email required. Please fill out this field",
  emailLength: "Email must be longer than 5 characters.",
  passwordRequired: "Password required. Please fill out this field",
  passwordLength: "Password must have at least 8 characters",
  registrationText: (isRegistration: boolean) =>
    isRegistration ? "Sign up" : "Sign in",
};

export default copy;
