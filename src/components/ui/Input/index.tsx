import { useField } from "formik";
import FormError from "components/ui/FormError";
import styles from "./index.module.scss";

type InputType = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  formError?: string;
};

const Input = ({
  id,
  label,
  type = "text",
  autoComplete,
  required = false,
  formError,
}: InputType) => {
  const [field, meta] = useField(id);
  const { touched, error } = meta;

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
      {touched && <FormError id={id} error={error || formError} />}
    </div>
  );
};

export default Input;
