import { useState } from "react";
import styles from "./index.module.scss";

const LoginForm = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const handleClick = () => {
    setShowRegistration(!showRegistration);
  };
  const headerTxt = showRegistration ? "Sign up" : "Sign in";
  const handleSubmit = () => {};
  const txt = showRegistration
    ? "Already have an account? Sign in to track your progress"
    : "Don't have an account and want to save your national park progress?";
  return (
    <div className={styles.container}>
      <img className={styles.avatar} width={50} src="yosemite.svg" alt="" />
      <h1 className={styles.header}>{`${headerTxt} to track your parks`}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          autoComplete="email"
          type="email"
          placeholder="Email"
        />
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit" className={styles.button}>
          {headerTxt}
        </button>
      </form>
      <p className={styles.registerText}>
        {txt}
        <button type="button" onClick={handleClick}>
          Sign up.
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
