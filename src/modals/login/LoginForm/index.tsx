import { useForm, FormProvider } from "react-hook-form";
import FormHelper from "components/ui/FormHelper";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import { User } from "types/user";
import { ButtonType } from "components/ui/Button/enum";
import copy from "modals/login/copy";
import styles from "./index.module.scss";

export type LoginFormProps = {
  showRegistration: boolean;
  handleOnSubmit: (values: User) => void;
  formError?: string;
};

const LoginForm = ({
  showRegistration,
  handleOnSubmit,
  formError,
}: LoginFormProps) => {
  const submitTxt = showRegistration ? copy.signUpText : copy.signInText;

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(handleOnSubmit)}>
        <Input
          id="email"
          label="Email"
          type="email"
          required
          rules={{
            required: copy.emailRequired,
            validate: (val: string) => {
              if (showRegistration && val.length < 5) {
                return copy.emailLength;
              }
            },
          }}
        />
        <Input
          id="password"
          autoComplete="off"
          label="Password"
          type="password"
          required
          rules={{
            required: copy.passwordRequired,
            validate: (val: string) => {
              if (showRegistration && val.length < 8) {
                return copy.passwordLength;
              }
            },
          }}
        />
        <Button
          disabled={!isValid}
          isLoading={isSubmitting}
          type={ButtonType.SUBMIT}
          text={submitTxt}
        />
        <FormHelper id="form" error={formError} />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
