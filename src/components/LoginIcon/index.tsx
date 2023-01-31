import { FaUser } from "react-icons/fa";
import styles from "./index.module.scss";

type LoginIconProps = {
  handleClick: () => void;
};

const LoginIcon = ({ handleClick }: LoginIconProps) => {
  return (
    <button className={styles.button} onClick={() => handleClick()}>
      <span className={styles.icon}>
        <FaUser />
      </span>
      <span className={styles.logIn}>Sign in</span>
    </button>
  );
};

export default LoginIcon;
