import { useRef, useEffect } from "react";
import { logout } from "services/auth.service";
import styles from "./index.module.scss";
import cn from "classnames";

const SubNav = ({
  showMenu,
  onClick,
}: {
  showMenu: boolean;
  onClick: () => void;
}) => {
  const myRef = useRef<HTMLDivElement>(null);

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
      await logout();
    } catch (e) {
      // handle error
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
          <button type="button" onClick={handleClick}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SubNav;
