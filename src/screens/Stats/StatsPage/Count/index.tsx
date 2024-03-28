import styles from "./index.module.scss";

type CountProps = {
  percentage: number;
};

const Count = ({ percentage }: CountProps) => {
  return (
    <div className={styles.container}>  
      <div>
        <span className={styles.total}>{`${percentage}%`}</span>
        <span>of units visited</span>
      </div>
    </div>
  );
};

export default Count;
