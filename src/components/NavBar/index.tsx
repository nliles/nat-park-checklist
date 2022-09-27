import { useState } from "react";
import cn from "classnames";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "actions";
import { State } from "reducers/types";
import { TOTAL_UNITS } from "../../constants";
import { ModalName } from "components/ui/Modal/types";
import SubNav from "components/SubNav";
import Total from "../Total";

type NavBarProps = {
  count: number;
};

const NavBar = ({ count }: NavBarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const handleClick = () => dispatch(openModal(ModalName.LOGIN_MODAL));

  const toggleClose = (action: boolean) => {
    setShowMenu(action);
  };

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
            <>
              <div
                className={cn(styles.test, {
                  [styles.active]: showMenu,
                })}
              >
                <button
                  className={styles.button}
                  onClick={() => toggleClose(!showMenu)}
                >
                  <img
                    id="avatar"
                    className={styles.avatar}
                    width={30}
                    src="yosemite.svg"
                    alt="Yosemit icon"
                  />
                </button>
              </div>
              <SubNav showMenu={showMenu} onClick={() => toggleClose(false)} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
