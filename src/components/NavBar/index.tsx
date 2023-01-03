import { useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "actions";
import { State } from "reducers/types";
import { TOTAL_UNITS } from "../../constants";
import { ModalName } from "components/ui/Modal/types";
import SubNav from "components/SubNav";
import Total from "components/Total";
import Avatar from 'components/Avatar'
import { NavBarProps } from "./types";
import styles from "./index.module.scss";

const NavBar = ({ count }: NavBarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: State) => !!state.auth.token);
  const handleClick = () => dispatch(openModal(ModalName.LOGIN_MODAL));

  const toggleClose = () => setShowMenu((prevState) => !prevState);

  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <div className={styles.header}>
          <img src="np.svg" alt="" width={25} className={styles.img} />
          <h1 className={styles.title}>
            <a href="/">National Park Unit Checklist</a>
          </h1>
        </div>
        <div className={styles.right}>
          {!isLoggedIn && (
            <button className={styles.button} onClick={() => handleClick()}>
              <img width={30} src="login.svg" alt="Login icon" />
              <span className={styles.logIn}>Sign in</span>
            </button>
          )}
          {isLoggedIn && (
            <>
              {count !== undefined && (
                <Total count={count} total={TOTAL_UNITS} styleName={styles.total} />
              )}
              <Avatar active={showMenu} handleClose={toggleClose}/>
              <SubNav showMenu={showMenu} onClick={() => setShowMenu(false)} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
