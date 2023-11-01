import LoginForm from "../LoginForm";
import { User } from "types/user";
import copy from "modals/login/copy";
import styles from "./index.module.scss";

export type LoginModalProps = {
  handleOnSubmit: (values: User) => void;
  handleButtonClick: () => void;
  showRegistration: boolean;
  formError?: string;
};

const LoginModalContainer = ({
  handleOnSubmit,
  handleButtonClick,
  showRegistration,
  formError,
}: LoginModalProps) => {
  const btnText = showRegistration ? copy.signInText : copy.signUpText;
  const copyVar = showRegistration ? copy.signUpText : copy.signInText;
  const paragraphText = copy.paragraphText(copyVar);
  const registerText = showRegistration
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
        {registerText}
        <button type="button" onClick={handleButtonClick}>
          <strong>{btnText}</strong>
        </button>
      </p>
    </div>
  );
};

export default LoginModalContainer;
