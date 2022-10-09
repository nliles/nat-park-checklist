import cn from "classnames";
import { FaSpinner } from "react-icons/fa";
import styles from "./index.module.scss";

type ButtonType = {
  txt: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  sizeSm?: boolean;
  styleName?: string;
};

const Button = ({
  type = "button",
  txt,
  disabled,
  isLoading,
  sizeSm,
  styleName,
}: ButtonType) => {
  return (
    <button
      disabled={disabled}
      className={cn(styles.button, styleName, {
        [styles.sm]: sizeSm,
      })}
      type={type}
    >
      {isLoading && (
        <span className={styles.spinnerWrapper}>
          <FaSpinner
            className={cn({
              [styles.spinner]: isLoading,
            })}
          />
        </span>
      )}
      <span className={styles.text}>{txt}</span>
    </button>
  );
};

export default Button;
