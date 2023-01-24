import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import { TOTAL_UNITS } from "../../constants";
import LoginModalContainer from "modals/login/LoginModalContainer";
import SubNav from "components/SubNav";
import Total from "components/Total";
import Avatar from "components/Avatar";
import LoginIcon from "components/LoginIcon";
import styles from "./index.module.scss";

type NavBarProps = {
  count?: number;
};

const NavBar = ({ count }: NavBarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const toggleClose = () => setShowMenu((prevState) => !prevState);
  const toggleModal = () => setShowModal((prevState) => !prevState);

  useLayoutEffect(() => {
    if (!isLoggedIn) {
      toggleModal();
    }
  }, [isLoggedIn]);

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
          {!isLoggedIn && <LoginIcon handleClick={toggleModal} />}
          {isLoggedIn && (
            <>
              {count !== undefined && (
                <Total
                  count={count}
                  total={TOTAL_UNITS}
                  styleName={styles.total}
                />
              )}
              <Avatar active={showMenu} handleClose={toggleClose} />
              <SubNav showMenu={showMenu} onClick={() => setShowMenu(false)} />
            </>
          )}
        </div>
      </div>
      {showModal && <LoginModalContainer onClose={toggleModal} />}
    </nav>
  );
};

export default NavBar;
