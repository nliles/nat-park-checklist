import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { loginSuccess, hideModal } from "actions";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import { login, register } from "services/auth.service";
import { initialValues, getValidationSchema } from "./validation";
import styles from "./index.module.scss";

const LoginForm = () => {
  const [showRegistration, setShowRegistration] = useState<boolean>(false);
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
    dispatch(loginSuccess(token));
    dispatch(hideModal());
  };

  const handleSubmit = async (values: User) => {
    if (values.email && values.password) {
      try {
        if (showRegistration) {
          const { user } = await register(values);
          console.log(user);
          handleSuccess(user.token);
        } else {
          const { user } = await login(values);
          handleSuccess(user.token);
        }
      } catch (e: any) {
        if (e.data.error === "Invalid Password") {
          setFormError("Wrong password. Please try again.");
        }
      }
    }
  };

  const handleChange = () => {
    if (formError) {
      setFormError(undefined);
    }
  };

  const validationSchema = getValidationSchema(showRegistration);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Hello, Traveler</h1>
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
              />
              <Input
                id="password"
                label="Password"
                type="password"
                required
                formError={formError}
              />
              <Button
                disabled={isSubmitting || !dirty || !isValid}
                type="submit"
                txt={submitTxt}
              />
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
