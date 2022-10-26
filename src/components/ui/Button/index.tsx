import cn from "classnames";
import { FaSpinner } from "react-icons/fa";
import { ButtonType, ButtonTypeValue } from 'components/ui/Button/enum'
import styles from "./index.module.scss";

type ButtonProps = {
  txt: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: ButtonTypeValue;
  sizeSm?: boolean;
  styleName?: string;
};

const Button = ({
  type = ButtonType.BUTTON,
  txt,
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
      <span className={styles.text}>{txt}</span>
    </button>
  );
};

export default Button;
