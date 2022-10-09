import styles from "./index.module.scss";

const ParkView = ({ title }: { title: string }) => {
  return (
    <div className={styles.titleSection}>
      <h2 className={styles.header}>{title}</h2>
    </div>
  );
};

export default ParkView;
