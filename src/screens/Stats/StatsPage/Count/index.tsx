import styles from "./index.module.scss";

const Count = ({ count, total }: { count: number; total: number }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>NPS units visited</h3>
      <div>
        <span className={styles.total}>{count}</span>
        <span>out of </span>
        <span>{total}</span>
      </div>
    </div>
  );
};

export default Count;
