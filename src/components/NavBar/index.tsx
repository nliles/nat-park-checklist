import styles from "./index.module.scss";
import { openModal } from "actions";
import { useDispatch } from "react-redux";
import { TOTAL_UNITS } from "../../constants";
import { ModalName } from "components/ui/Modal/types";
import Total from "../Total";

type NavBarProps = {
  count: number;
};

const isLoggedIn = false;

const NavBar = ({ count }: NavBarProps) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(openModal(ModalName.LOGIN_MODAL));
  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <div className={styles.header}>
          <img src="np.svg" alt="" width={25} className={styles.img} />
          <h1 className={styles.title}>National Park Unit Checklist</h1>
        </div>
        <div className={styles.right}>
          <Total count={count} total={TOTAL_UNITS} styleName={styles.total} />
          {!isLoggedIn && (
            <button className={styles.button} onClick={() => handleClick()}>
              <img width={30} src="login.svg" alt="Login icon" />
              <span className={styles.logIn}>Sign in</span>
            </button>
          )}
          {isLoggedIn && (
            <img
              className={styles.avatar}
              width={30}
              src="yosemite.svg"
              alt="Yosemit icon"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
