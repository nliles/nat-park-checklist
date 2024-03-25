import { useFormContext, RegisterOptions } from "react-hook-form";
import FormHelper from "components/ui/FormHelper";
import styles from "./Input.module.scss";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: "on" | "off";
  required?: boolean;
  formError?: string;
  rules?: RegisterOptions;
};

const Input = ({
  id,
  label,
  type = "text",
  autoComplete = "on",
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
