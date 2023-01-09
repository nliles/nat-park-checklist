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
  const paragraphText = copy.paragraphText(showRegistration);
  const btnTxt = copy.registrationText(!showRegistration);
  const registerTxt = copy.accountText(showRegistration);

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
