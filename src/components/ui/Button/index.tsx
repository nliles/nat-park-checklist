import cn from "classnames";
import styles from "./index.module.scss";

type ButtonType = {
  txt: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  sizeSm?: boolean;
  styleName?: string;
};

const Button = ({
  type = "button",
  txt,
  disabled,
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
      {txt}
    </button>
  );
};

export default Button;
