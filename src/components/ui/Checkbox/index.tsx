import React from "react";
import { useFormContext } from "react-hook-form";
import styles from "./Checkbox.module.scss";

export type CheckboxProps = {
  id: string;
  label: string;
  name: string;
};

const Checkbox = ({ id, label, name }: CheckboxProps) => {
  const { register } = useFormContext();
  return (
    <div>
      <label className={styles.checkboxWrapper} htmlFor={id}>
        {label}
        <input
          {...register(name)}
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
