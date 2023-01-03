import { CountProps } from "./types";
import styles from "./index.module.scss";

const Count = ({ header, count, total }: CountProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{header}</h3>
      <div>
        <span className={styles.total}>{count}</span>
        <span>out of </span>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default Count;
