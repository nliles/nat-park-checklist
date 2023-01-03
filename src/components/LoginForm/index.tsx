import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import FormHelper from "components/ui/FormHelper";
import { loginSuccess, hideModal } from "actions";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import { ButtonType } from "components/ui/Button/enum";
import { login, register } from "services/auth.service";
import { User } from "types";
import copy from "./en";
import styles from "./index.module.scss";

const LoginForm = () => {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [formPasswordError, setFormPasswordError] = useState<string>();
  const [formEmailError, setFormEmailError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const dispatch = useDispatch();
  const paragraphText = copy.paragraphText(showRegistration);
  const submitTxt = copy.registrationText(showRegistration);
  const btnTxt = copy.registrationText(!showRegistration);
  const txt = copy.accountText(showRegistration);

  const handleClick = () => {
    setShowRegistration(!showRegistration);
  };

  const handleSuccess = (token: string) => {
    sessionStorage.setItem("token", token);
    dispatch(loginSuccess(token));
    dispatch(hideModal());
  };

  const onSubmit = async (values: User) => {
    if (values.email && values.password) {
      const formattedValues = {
        email: values.email.trim().toLowerCase(),
        password: values.password.trim(),
      };
      try {
        if (showRegistration) {
          const { user } = await register(formattedValues);
          handleSuccess(user.token);
        } else {
          const { user } = await login(formattedValues);
          handleSuccess(user.token);
        }
      } catch (e: any) {
        if (e.data?.error === copy.passwordError || e.data?.error === copy.emailError) {
          setFormPasswordError(e.data?.error);
        } else {
          setFormError(copy.generalError);
        }
      }
    }
  };

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = methods;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{copy.headerText}</h1>
      <p className={styles.txt}>{paragraphText}</p>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
      <p className={styles.registerText}>
        {txt}
        <button type="button" onClick={handleClick}>
          <strong>{btnTxt}</strong>
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
