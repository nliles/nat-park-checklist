import styles from "./index.module.scss";
import { LIST_OPTIONS, TOTAL_UNITS } from "../../constants";
import Total from "../Total";

type NavBarProps = {
  count: number;
};
const NavBar = ({ count }: NavBarProps) => (
  <nav className={styles.nav}>
    <header className={styles.header}>
      <div className={styles.content}>
        <img src="np.svg" alt="" width={25} className={styles.img} />
        <h1 className={styles.title}>National Park Unit Checklist</h1>
      </div>
      <Total count={count} total={TOTAL_UNITS} />
    </header>
  </nav>
);

export default NavBar;
