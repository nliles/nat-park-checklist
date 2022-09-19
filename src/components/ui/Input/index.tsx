import React from "react";
import styles from "./index.module.scss";

type InputType = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Input = ({
  id,
  label,
  type = "text",
  autoComplete,
  required = false,
  value,
  onChange,
}: InputType) => {
  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={styles.input}
        autoComplete={autoComplete}
        type={type}
        placeholder={label}
        required={required}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
