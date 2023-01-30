import cn from "classnames";
import { FaSpinner } from "react-icons/fa";
import { ButtonType, ButtonTypeValue } from "components/ui/Button/enum";
import styles from "./index.module.scss";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: ButtonTypeValue;
  sizeSm?: boolean;
  styleName?: string;
};

const Button = ({
  type = ButtonType.BUTTON,
  text,
  disabled,
  isLoading,
  sizeSm,
  styleName,
}: ButtonProps) => {
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
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
