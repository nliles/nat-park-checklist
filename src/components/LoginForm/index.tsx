import { useState } from "react";
import styles from "./index.module.scss";

const LoginForm = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const handleClick = () => {
    setShowRegistration(!showRegistration);
  };
  const btnTxt = showRegistration ? "Sign up" : "Sign in";
  const handleSubmit = () => {};
  const txt = showRegistration
    ? "Already have an account?"
    : "Don't have an account?";
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Hello, Traveler</h1>
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
          {btnTxt}
        </button>
      </form>
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
