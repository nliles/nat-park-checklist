import { User } from "types/user";

export type LoginFormProps = {
  showRegistration: boolean;
  handleOnSubmit: (values: User) => void;
  formError?: string;
  formEmailError?: string;
  formPasswordError?: string;
}
