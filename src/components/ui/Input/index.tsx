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
  return (
    <>
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
    </>
  );
};

export default Input;
