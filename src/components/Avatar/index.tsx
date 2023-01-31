import cn from "classnames";
import styles from "./index.module.scss";

type AvatarProps = {
  active: boolean;
  handleClose: () => void;
};

const Avatar = ({ active, handleClose }: AvatarProps) => {
  return (
    <div
      className={cn(styles.menuIcon, {
        [styles.active]: active,
      })}
    >
      <button className={styles.button} onClick={handleClose}>
        <img
          id="avatar"
          className={styles.avatar}
          width={30}
          src="np.svg"
          alt="Yosemite icon"
        />
      </button>
    </div>
  );
};

export default Avatar;
