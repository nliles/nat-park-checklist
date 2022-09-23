import { FormEvent } from "react";
import { useField } from 'formik';
import styles from "./index.module.scss";

type InputType = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
};

const Input = ({
  id,
  label,
  type = "text",
  autoComplete,
  required = false,
}: InputType) => {
  const [field, meta] = useField(id);
  const { touched, error } = meta;

  console.log('error', error)

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
      {touched && error && (
        <div
          role="alert"
          aria-live="polite"
          id={`${id}_error`}
          className={styles.inputError}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
