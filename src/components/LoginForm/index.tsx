import { useState, FormEvent } from "react";
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        let res;
        if (showRegistration) {
          await register(email, password);
        } else {
          await login(email, password);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Hello, Traveler</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            handleOnChange("email", e)
          }
          required
          value={email}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            handleOnChange("password", e)
          }
        />
        <button
          type="submit"
          className={styles.button}
          disabled={!email || !password}
        >
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
