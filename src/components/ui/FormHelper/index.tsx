import styles from "./index.module.scss";
import cn from "classnames";

type FormHelperProps = {
  id: string;
  error?: string;
  success?: string;
};

const FormHelper = ({ id, error, success }: FormHelperProps) => {
  const helperId = error ? `${id}_error` : `${id}_helper`
  const text = error ? error : success

  return (
    <>
      {error || success && (
        <div
          role="alert"
          aria-live="polite"
          id={helperId}
          className={cn(styles.alert, {
            [styles.error]: !!error,
            [styles.helper]: !!success,
          }
          )}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default FormHelper;
