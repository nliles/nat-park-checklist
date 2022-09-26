import React from "react";
import { useField, useFormikContext } from "formik";
import styles from "./index.module.scss";

type CheckboxType = {
  id: string;
  label: string;
  name: string;
};

const Checkbox = ({ id, label, name }: CheckboxType) => {
  const [field] = useField(name);
  const values = field.value || [];
  const { setFieldValue } = useFormikContext();
  const checked = values.includes(id);

  const handleOnChange = (id: string) => {
    const filteredValues = values.filter((v: string) => v !== id);
    if (values.includes(id)) {
      setFieldValue(name, filteredValues);
    } else {
      setFieldValue(name, [...filteredValues, id]);
    }
  };

  return (
    <div>
      <label className={styles.checkboxWrapper} htmlFor={id}>
        {label}
        <input
          className={styles.checkbox}
          checked={checked}
          onChange={() => handleOnChange(id)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleOnChange(id);
            }
          }}
          type="checkbox"
          id={id}
          name={id}
        />
        <span aria-hidden={true} className={styles.checkmark} />
      </label>
    </div>
  );
};

export default Checkbox;
