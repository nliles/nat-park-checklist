import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import { TOTAL_UNITS } from "../../constants";
import LoginModalContainer from "modals/login/LoginModalContainer";
import SubNav from "components/SubNav";
import Total from "components/Total";
import Avatar from "components/Avatar";
import LoginIcon from "components/LoginIcon";
import copy from "./copy";
import styles from "./NavBar.module.scss";

type NavBarProps = {
  count?: number;
};

const NavBar = ({ count }: NavBarProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const isLoggedIn = useSelector((state: State) => !!state.auth.user);
  const toggleClose = () => setShowMenu((prevState) => !prevState);
  const toggleModal = () => setShowModal((prevState) => !prevState);

  // useLayoutEffect(() => {
  //   if (!isLoggedIn) {
  //     toggleModal();
  //   }
  // }, [isLoggedIn]);

  return (
    <nav className={styles.nav}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <a href="/">{copy.siteTitle}</a>
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
                  tooltipText={copy.tooltipCopy}
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
