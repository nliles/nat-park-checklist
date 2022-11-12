import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import cn from "classnames";

type FormHelperProps = {
  id: string;
  error?: string;
  success?: string;
  delay?: number;
};

const FormHelper = ({ id, error, success, delay }: FormHelperProps) => {
  const [showMsg, setShowMsg] = useState(false);
  const helperId = error ? `${id}_error` : `${id}_helper`;
  const text = error ? error : success;

  useEffect(() => {
    if (error || success) {
      setShowMsg(true);
    }
  }, [error, success]);

  useEffect(() => {
    if (delay && showMsg) {
      let timer = setTimeout(() => setShowMsg(false), delay * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [delay, showMsg]);

  return (
    <>
      {showMsg && (
        <div
          role="alert"
          aria-live="polite"
          id={helperId}
          className={cn(styles.alert, {
            [styles.error]: !!error,
            [styles.helper]: !!success,
          })}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default FormHelper;
