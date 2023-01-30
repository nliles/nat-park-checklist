const copy = {
  headerText: "Hello, Traveler",
  signUpText: "Sign up",
  signInText: "Sign in",
  passwordRequired: "Password required. Please fill out this field",
  passwordLength: "Password must have at least 8 characters",
  paragraphText: (signUpText: string) => `${signUpText} to track your National Park visits.`,
  accountRegistrationText: "Already have an account?",
  accountLoginText: "Don't have an account?",
  registrationSuccess: "Thank you for creating an account!",
  generalError: "Something went wrong. Please try again later.",
  emailRequired: "Email required. Please fill out this field",
  emailLength: "Email must be longer than 5 characters.",
};

export default copy;
