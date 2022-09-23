import { useState, FormEvent } from "react";
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import Input from "components/ui/Input";
import { login, register } from "services/login.service";
import styles from "./index.module.scss";

const LoginForm = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitTxt = showRegistration ? "Sign in" : "Sign up";
  const btnTxt = showRegistration ? "Sign up" : "Sign in";
  const txt = showRegistration
    ? "Already have an account?"
    : "Don't have an account?";

  const handleClick = () => {
    setShowRegistration(!showRegistration);
  };

  const handleOnChange = (name: string, e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  type User = {
    email: string;
    password: string;
  }

  const handleSubmit = async (values: User) => {
    if (email && password) {
      try {
        let res;
        if (showRegistration) {
          await register(values);
        } else {
          await login(values);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const initialValues = {
      email: '',
      password: '',
  }

  const validationSchema = object().shape({
    email: string()
      .required('Email required. Please fill out this field')
      .min(5, 'Email must be longer than 5 characters.'),
    password: string()
      .required('Password required. Please fill out this field')
      .min(8, 'Password must have at least 8 characters'),
  });

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
      <Form className={styles.form}>
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
        />
        <button
          disabled={isSubmitting || !dirty || !isValid}
          type="submit"
          className={styles.button}
        >
          {submitTxt}
        </button>
        </Form>
      )}}
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
