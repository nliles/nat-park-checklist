import cn from "classnames";
import { FaSpinner } from "react-icons/fa";
import { ButtonType, ButtonTypeValue } from "components/ui/Button/enum";
import styles from "./Button.module.scss";

type ButtonProps = {
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: ButtonTypeValue;
  sizeSm?: boolean;
  className?: string;
  secondary?: boolean;
  onClick?: () => void;
};

const Button = ({
  type = ButtonType.BUTTON,
  text,
  disabled,
  isLoading,
  sizeSm,
  className,
  secondary,
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(styles.button, className, {
        [styles.sm]: sizeSm,
        [styles.secondary]: secondary,
      })}
      type={type}
      onClick={onClick}
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
