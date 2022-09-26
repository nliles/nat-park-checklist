import { FormEvent } from "react";
import { useField } from "formik";
import styles from "./index.module.scss";

type InputType = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  formError?: string;
};

const Input = ({
  id,
  label,
  type = "text",
  autoComplete,
  required = false,
  formError,
}: InputType) => {
  const [field, meta] = useField(id);
  const { touched, error } = meta;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        {...field}
        id={id}
        className={styles.input}
        autoComplete={autoComplete}
        type={type}
        placeholder={label}
        required={required}
      />
      {touched && (error || formError) && (
        <div
          role="alert"
          aria-live="polite"
          id={`${id}_error`}
          className={styles.inputError}
        >
          {error || formError}
        </div>
      )}
    </div>
  );
};

export default Input;
