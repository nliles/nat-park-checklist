import { string, object } from "yup";

const regValidationSchema = object().shape({
  email: string()
    .required("Email required. Please fill out this field")
    .min(5, "Email must be longer than 5 characters."),
  password: string()
    .required("Password required. Please fill out this field")
    .min(8, "Password must have at least 8 characters"),
});

const loginValidationSchema = object().shape({
  email: string().required("Email required. Please fill out this field"),
  password: string().required("Password required. Please fill out this field"),
});

export const getValidationSchema = (showRegistration: boolean) =>
  showRegistration ? regValidationSchema : loginValidationSchema;
