import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "actions";
import toast from "react-hot-toast";
import { login, register } from "services/auth.service";
import { User } from "types/user";
import Modal from "components/ui/Modal";
import LoginModal from "modals/login/LoginModal";
import copy from "modals/login/copy";

type LoginModalContainerProps = {
  onClose: () => void;
};

const LoginModalContainer = ({ onClose }: LoginModalContainerProps) => {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>();
  const dispatch = useDispatch();

  const toggleRegistration = () => {
    setShowRegistration((prevVal) => !prevVal);
    setFormError(undefined);
  }

  const handleSuccess = (userId: string) => {
    localStorage.setItem("user", userId)
    dispatch(loginSuccess(userId));
    onClose();
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
          handleSuccess(user.id);
          toast.success(copy.registrationSuccess)
        } else {
          const { user } = await login(formattedValues);
          handleSuccess(user.id);
        }
      } catch (e: any) {
        const errorMsg = e?.data?.message || copy.generalError;
        setFormError(errorMsg);
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
      />
    </Modal>
  );
};

export default LoginModalContainer;
