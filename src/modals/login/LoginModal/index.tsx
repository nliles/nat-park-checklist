import LoginForm from "../LoginForm";
import copy from "./en";
import { LoginModalProps } from "./types";
import styles from "./index.module.scss";

const LoginModalContainer = ({
  handleOnSubmit,
  handleButtonClick,
  showRegistration,
  formEmailError,
  formPasswordError,
  formError,
}: LoginModalProps) => {
  const btnTxt = showRegistration ? copy.signInText : copy.signUpText;
  const paragraphText = copy.paragraphText(btnTxt);
  const registerTxt = showRegistration ? copy.accountRegistrationText : copy.accountLoginText;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{copy.headerText}</h1>
      <p className={styles.paragraphText}>{paragraphText}</p>
      <LoginForm
        showRegistration={showRegistration}
        handleOnSubmit={handleOnSubmit}
        formError={formError}
        formEmailError={formEmailError}
        formPasswordError={formPasswordError}
      />
      <p className={styles.registerText}>
        {registerTxt}
        <button type="button" onClick={handleButtonClick}>
          <strong>{btnTxt}</strong>
        </button>
      </p>
    </div>
  );
};

export default LoginModalContainer;
