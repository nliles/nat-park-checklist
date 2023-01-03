export default {
  headerText: 'Hello, Traveler',
  paragraphText: (isRegistration: boolean) => `${isRegistration ? "Sign up" : "Sign in"} to save your progress.`,
  emailRequired: "Email required. Please fill out this field",
  emailLength: "Email must be longer than 5 characters.",
  passwordRequired: "Password required. Please fill out this field",
  passwordLength: "Password must have at least 8 characters",
  emailError: "User Already Exist. Please Login",
	passwordError: "Wrong password. Please try again.",
  generalError: "Something went wrong. Please try again later.",
  accountText: (isRegistration: boolean) => isRegistration ? "Already have an account?" : "Don't have an account?",
  registrationText: (isRegistration: boolean) => isRegistration ? "Sign up" : "Sign in",
};
