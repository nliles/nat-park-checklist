import styles from "./index.module.scss";

type CountProps = {
  header: string;
  count: number;
  total: number;
};

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
