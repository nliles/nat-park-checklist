import { useState } from "react";
import Input from "components/ui/Input";
import styles from "./index.module.scss";

const LoginForm = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const handleClick = () => {
    setShowRegistration(!showRegistration);
  };
  const submitTxt = showRegistration ? "Sign in" : "Sign up";
  const btnTxt = showRegistration ? "Sign up" : "Sign in";
  const txt = showRegistration
    ? "Already have an account?"
    : "Don't have an account?";

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Hello, Traveler</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input id="email" label="Email" type="email" autoComplete="email" />
        <Input id="password" label="Password" type="password" />
        <button type="submit" className={styles.button}>
          {submitTxt}
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
