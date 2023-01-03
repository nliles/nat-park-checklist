import { LoginIconProps } from './types';
import styles from "./index.module.scss";

const LoginIcon = ({ handleClick }: LoginIconProps) => {
  return (
    <button className={styles.button} onClick={() => handleClick()}>
      <img width={30} src="login.svg" alt="Login icon" />
      <span className={styles.logIn}>Sign in</span>
    </button>
  );
};

export default LoginIcon;
