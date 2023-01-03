import { useForm, FormProvider } from "react-hook-form";
import FormHelper from "components/ui/FormHelper";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import { ButtonType } from "components/ui/Button/enum";
import { LoginFormProps } from "./types";
import copy from "./en";
import styles from "./index.module.scss";

const LoginForm = ({
  showRegistration,
  handleOnSubmit,
  formError,
  formEmailError,
  formPasswordError,
}: LoginFormProps) => {
  const submitTxt = copy.registrationText(showRegistration);

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
          autoComplete="email"
          required
          formError={formEmailError}
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
          label="Password"
          type="password"
          required
          formError={formPasswordError}
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
          txt={submitTxt}
        />
        <FormHelper id="form" error={formError} />
      </form>
    </FormProvider>
  );
};

export default LoginForm;
