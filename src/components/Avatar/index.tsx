import cn from "classnames";
import styles from "./Avatar.module.scss";

type AvatarProps = {
  active: boolean;
  handleClose: () => void;
};

const Avatar = ({ active, handleClose }: AvatarProps) => (
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
        src="https://www.nps.gov/common/uploads/structured_data/A2751C78-ACB9-A19B-D7946503414E34AE.jpg"
        alt="Kelso Dunes"
      />
    </button>
  </div>
);

export default Avatar;
