const copy = {
  headerText: "Hello, Traveler",
  paragraphText: (isRegistration: boolean) =>
    `${isRegistration ? "Sign up" : "Sign in"} to save your progress.`,
  emailError: "User Already Exist. Please Login",
  passwordError: "Wrong password. Please try again.",
  generalError: "Something went wrong. Please try again later.",
  accountText: (isRegistration: boolean) =>
    isRegistration ? "Already have an account?" : "Don't have an account?",
  registrationText: (isRegistration: boolean) =>
    isRegistration ? "Sign up" : "Sign in",
};

export default copy;
