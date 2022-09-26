import styles from "./index.module.scss";

type ErrorProps = {
  id: string;
  error?: string;
};

const FormError = ({ id, error }: ErrorProps) => {
  return (
    <>
      {error && (
        <div
          role="alert"
          aria-live="polite"
          id={`${id}_error`}
          className={styles.inputError}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default FormError;
