import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import cn from "classnames";
import { logoutSuccess } from "actions";
import { logout } from "services/auth.service";
import styles from "./index.module.scss";
import copy from "./en";

type SubNavProps = {
  showMenu: boolean;
  onClick: () => void;
};

const SubNav = ({ showMenu, onClick }: SubNavProps) => {
  const myRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleClickOutside = (e: MouseEvent) => {
    const isAvatarClick =
      (e.target as HTMLElement).getAttribute("id") === "avatar";
    if (
      myRef?.current &&
      !myRef.current.contains(e.target as Node) &&
      !isAvatarClick
    ) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClick = async () => {
    try {
      await logout()
      onClick();
      localStorage.removeItem("user");
      dispatch(logoutSuccess());
      toast.success(copy.logoutSuccess);
    } catch (e) {
      toast.error(copy.logoutError);
    }
  };

  return (
    <nav
      aria-label="Main"
      ref={myRef}
      className={cn(styles.container, {
        [styles.show]: showMenu,
      })}
    >
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <a href="/stats">{copy.statsLinkText}</a>
        </li>
        <li className={styles.listItem}>
          <button type="button" onClick={handleClick}>
            {copy.logoutBtnText}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubNav;
