import { useState, useLayoutEffect } from "react";
import { loadState, saveState } from "storage/sessionStorage";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import LoginModalContainer from "modals/login/LoginModalContainer";
import SubNav from "components/SubNav";
import Total from "components/Total";
import Avatar from "components/Avatar";
import LoginIcon from "components/LoginIcon";
import copy from "./copy";
import styles from "./NavBar.module.scss";

type NavBarProps = {
  count?: number;
  total?: number;
};

const NavBar = ({ count, total }: NavBarProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const toggleClose = () => setShowMenu((prevState) => !prevState);
  const toggleModal = () => setShowModal((prevState) => !prevState);

  // TODO: Show this once per session
  useLayoutEffect(() => {
    const hideModal = loadState("hideModal");
    if (!isLoggedIn && !hideModal) {
      toggleModal();
      saveState("hideModal", "true");
    }
  }, [isLoggedIn]);

  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <a href="/">
              <img
                id="avatar"
                className={styles.img}
                width={30}
                src="np.svg"
                alt={copy.altText}
              />
              <span>{copy.siteTitle}</span>
            </a>
          </h1>
        </div>
        <div className={styles.right}>
          {!isLoggedIn && <LoginIcon handleClick={toggleModal} />}
          {isLoggedIn && (
            <>
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
