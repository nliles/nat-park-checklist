import React from "react";
import styles from "./index.module.scss";

type InputType = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
};

const Input = ({ id, label, type = "text", autoComplete }: InputType) => {
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
      />
    </>
  );
};

export default Input;
