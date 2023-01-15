import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "actions";
import { SubNavProps } from "./types";
import styles from "./index.module.scss";
import cn from "classnames";

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

  const handleClick = () => {
    sessionStorage.removeItem("token")
    dispatch(logoutSuccess());
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
          <a href="/stats">My Stats</a>
        </li>
        <li className={styles.listItem}>
          <button type="button" onClick={handleClick}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubNav;
