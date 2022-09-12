import styles from "./index.module.scss";
import { LIST_OPTIONS, TOTAL_UNITS } from "../../constants";
import Total from "../Total";

type NavBarProps = {
  count: number;
};

const isLoggedIn = false;

// <Total count={count} total={TOTAL_UNITS} />

const NavBar = ({ count }: NavBarProps) => (
  <nav className={styles.nav}>
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="np.svg" alt="" width={25} className={styles.img} />
        <h1 className={styles.title}>National Park Unit Checklist</h1>
      </div>
      <div className={styles.right}>
        {!isLoggedIn && (
          <button className={styles.button} onClick={() => {}}>
            <img width={30} src="login.svg" alt="" />
            <span>Sign in</span>
          </button>
        )}
        {isLoggedIn && (
          <img className={styles.avatar} width={30} src="yosemite.svg" alt="" />
        )}
      </div>
    </header>
  </nav>
);

export default NavBar;
