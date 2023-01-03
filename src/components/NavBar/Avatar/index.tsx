import cn from "classnames";
import { AvatarProps } from "./types";
import styles from "./index.module.scss";

const Avatar = ({ active, handleClose }: AvatarProps) => {
  return (
    <div
      className={cn(styles.menuIcon, {
        [styles.active]: active,
      })}
    >
      <button
        className={styles.button}
        onClick={handleClose}
      >
        <img
          id="avatar"
          className={styles.avatar}
          width={30}
          src="yosemite.svg"
          alt="Yosemite icon"
        />
      </button>
    </div>
  );
};

export default Avatar;
