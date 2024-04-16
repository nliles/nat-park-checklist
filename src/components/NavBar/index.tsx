import { useState, useLayoutEffect } from "react";
import { loadState, saveState } from "storage/sessionStorage";
import { useSelector } from "react-redux";
import { State } from "reducers/types";
import LoginModalContainer from "modals/login/LoginModalContainer";
import SubNav from "components/SubNav";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { icons } from "components/NavBar/constants";
import Icon from "enum/Icon";
import Avatar from "components/Avatar";
import LoginIcon from "components/LoginIcon";
import copy from "./copy";
import styles from "./NavBar.module.scss";

const NavBar = () => {
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
          <div className={styles.socialLinks}>
            {icons.map((i) => (
              <a href={i.link} key={i.link}>
                {i.icon === Icon.LINKED_IN && (
                  <FaLinkedin aria-label="LinkedIn" />
                )}
                {i.icon === Icon.GITHUB && <FaGithub aria-label="Github" />}
                {i.icon === Icon.INSTAGRAM && (
                  <FaInstagram aria-label="Instagram" />
                )}
              </a>
            ))}
          </div>
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
