import React from "react";
import { useFormContext } from "react-hook-form";
import { CheckboxProps } from "./types";
import styles from "./index.module.scss";

const Checkbox = ({ id, label, name, handleOnChange }: CheckboxProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <label className={styles.checkboxWrapper} htmlFor={id}>
        {label}
        <input
          {...register(name, {
            onChange: () => handleOnChange(),
          })}
          className={styles.checkbox}
          type="checkbox"
          id={id}
          value={id}
        />
        <span aria-hidden={true} className={styles.checkmark} />
      </label>
    </div>
  );
};

export default Checkbox;
