import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, hideModal } from "actions";
import { login, register } from "services/auth.service";
import { User } from "types/user";
import LoginForm from "../LoginForm";
import copy from "./en";
import styles from "./index.module.scss";

const LoginFormContainer = () => {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [formPasswordError, setFormPasswordError] = useState<string>();
  const [formEmailError, setFormEmailError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const dispatch = useDispatch();
  const paragraphText = copy.paragraphText(showRegistration);
  const btnTxt = copy.registrationText(!showRegistration);
  const registerTxt = copy.accountText(showRegistration);

  const handleClick = () => {
    setShowRegistration(!showRegistration);
  };

  const handleSuccess = (token: string) => {
    sessionStorage.setItem("token", token);
    dispatch(loginSuccess(token));
    dispatch(hideModal());
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
    <div className={styles.container}>
      <h1 className={styles.header}>{copy.headerText}</h1>
      <p className={styles.paragraphText}>{paragraphText}</p>
      <LoginForm
        showRegistration={showRegistration}
        handleOnSubmit={onSubmit}
        formError={formError}
        formEmailError={formEmailError}
        formPasswordError={formPasswordError}
      />
      <p className={styles.registerText}>
        {registerTxt}
        <button type="button" onClick={handleClick}>
          <strong>{btnTxt}</strong>
        </button>
      </p>
    </div>
  );
};

export default LoginFormContainer;
