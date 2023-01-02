import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';
import FormHelper from "components/ui/FormHelper";
import { InputProps } from './types'
import styles from "./index.module.scss";

const Input = ({
  id,
  label,
  type = "text",
  autoComplete,
  required = false,
  formError,
}: InputProps) => {
  const { getFieldState, register, control, formState } = useFormContext();
  const { error: fieldError, isTouched: touched } = getFieldState(id, formState);
  const normalizedError = typeof fieldError === 'string' ? fieldError : fieldError?.message;

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        {...register(id)}
        id={id}
        aria-describedby={`${id}_error`}
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
