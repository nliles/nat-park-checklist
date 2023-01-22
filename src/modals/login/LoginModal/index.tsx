import LoginForm from "../LoginForm";
import copy from "./en";
import { LoginModalProps } from "./types";
import styles from "./index.module.scss";

const LoginModalContainer = ({
  handleOnSubmit,
  handleButtonClick,
  showRegistration,
  formError,
}: LoginModalProps) => {
  const btnTxt = showRegistration ? copy.signInText : copy.signUpText;
  const copyVar = showRegistration ? copy.signUpText : copy.signInText;
  const paragraphText = copy.paragraphText(copyVar);
  const registerTxt = showRegistration
    ? copy.accountRegistrationText
    : copy.accountLoginText;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{copy.headerText}</h1>
      <p className={styles.paragraphText}>{paragraphText}</p>
      <LoginForm
        showRegistration={showRegistration}
        handleOnSubmit={handleOnSubmit}
        formError={formError}
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
