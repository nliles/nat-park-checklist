import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import FormHelper from "components/ui/FormHelper";
import { loginSuccess, hideModal } from "actions";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import { ButtonType } from "components/ui/Button/enum";
import { login, register } from "services/auth.service";
import { initialValues, getValidationSchema } from "./validation";
import styles from "./index.module.scss";

const ERROR = {
  PASSWORD: "Wrong password. Please try again.",
  EMAIL: "User Already Exist. Please Login",
  GENERAL: "Something went wrong. Please try again later.",
};

const LoginForm = () => {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
  const [formPasswordError, setFormPasswordError] = useState<
    string | undefined
  >();
  const [formEmailError, setFormEmailError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const dispatch = useDispatch();
  const submitTxt = showRegistration ? "Sign up" : "Sign in";
  const btnTxt = showRegistration ? "Sign in" : "Sign up";
  const txt = showRegistration
    ? "Already have an account?"
    : "Don't have an account?";

  const handleClick = () => {
    setShowRegistration(!showRegistration);
  };

  type User = {
    email: string;
    password: string;
  };

  const handleSuccess = (token: string) => {
    sessionStorage.setItem("token", token);
    dispatch(loginSuccess(token));
    dispatch(hideModal());
  };

  const handleSubmit = async (values: User) => {
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
        if (e.data?.error === ERROR.PASSWORD) {
          setFormPasswordError(ERROR.PASSWORD);
        } else if (e.data?.error === ERROR.EMAIL) {
          setFormEmailError(ERROR.EMAIL);
        } else {
          setFormError(ERROR.GENERAL);
        }
      }
    }
  };

  const handleChange = () => {
    if (formPasswordError) {
      setFormPasswordError(undefined);
      setFormEmailError(undefined);
      setFormError(undefined);
    }
  };

  const validationSchema = getValidationSchema(showRegistration);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Hello, Traveler</h1>
      <p className={styles.txt}>{`${submitTxt} to save your progress.`}</p>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, isValid, dirty, isSubmitting }) => {
          return (
            <Form className={styles.form} onChange={handleChange}>
              <Input
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                required
                formError={formEmailError}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                required
                formError={formPasswordError}
              />
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                isLoading={isSubmitting}
                type={ButtonType.SUBMIT}
                txt={submitTxt}
              />
              <FormHelper id="form" error={formError} />
            </Form>
          );
        }}
      </Formik>
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
