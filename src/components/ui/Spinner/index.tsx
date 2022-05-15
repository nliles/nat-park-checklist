import styles from "./index.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loading} />
    </div>
  );
};

export default Spinner;
