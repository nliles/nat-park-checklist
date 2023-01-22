import { User } from "types/user";

export type LoginModalProps = {
  handleOnSubmit: (values: User) => void;
  handleButtonClick: () => void;
  showRegistration: boolean;
  formError?: string;
};
