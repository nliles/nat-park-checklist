import { useFormContext } from "react-hook-form";
import FormHelper from "components/ui/FormHelper";
import { InputProps } from "./types";
import styles from "./index.module.scss";

const Input = ({
  id,
  label,
  type = "text",
  autoComplete,
  required = false,
  formError,
  rules,
}: InputProps) => {
  const { getFieldState, register, formState } = useFormContext();
  const { error, isTouched: touched } = getFieldState(id, formState);
  const normalizedError = typeof error === "string" ? error : error?.message;
  const describedBy = error ? `${id}_error` : undefined;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        {...register(id, rules)}
        id={id}
        aria-describedby={describedBy}
        className={styles.input}
        autoComplete={autoComplete}
        type={type}
        placeholder={label}
        required={required}
      />
      {touched && <FormHelper id={id} error={normalizedError || formError} />}
    </div>
  );
};

export default Input;
