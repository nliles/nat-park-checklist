import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "actions";
import { login, register } from "services/auth.service";
import { User } from "types/user";
import Modal from "components/ui/Modal";
import LoginModal from "../LoginModal";
import { LoginModalContainerProps } from "./types";
import copy from "./en";

const LoginModalContainer = ({ onClose }: LoginModalContainerProps) => {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [formPasswordError, setFormPasswordError] = useState<string>();
  const [formEmailError, setFormEmailError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const dispatch = useDispatch();
  const toggleRegistration = () => setShowRegistration((prevVal) => !prevVal);

  const handleSuccess = (token: string) => {
    sessionStorage.setItem("token", token);
    dispatch(loginSuccess(token));
  };

  const onSubmit = async (values: User) => {
    if (values.email && values.password) {
      const formattedValues = {
        email: values.email.trim().toLowerCase(),
        password: values.password.trim(),
      };
      try {
        if (showRegistration) {
          const { user } = await register(formattedValues);
          handleSuccess(user.token);
        } else {
          const { user } = await login(formattedValues);
          handleSuccess(user.token);
        }
      } catch (e: any) {
        if (e.data?.error === copy.emailError) {
          setFormEmailError(copy.emailError);
        } else if (e.data?.error === copy.passwordError) {
          setFormPasswordError(copy.passwordError);
        } else {
          setFormError(copy.generalError);
        }
      }
    }
  };

  return (
    <Modal onClose={onClose} modalLabel="Login and registration modal">
      <LoginModal
        handleOnSubmit={onSubmit}
        handleButtonClick={toggleRegistration}
        showRegistration={showRegistration}
        formError={formError}
        formPasswordError={formPasswordError}
        formEmailError={formEmailError}
      />
    </Modal>
  );
};

export default LoginModalContainer;
