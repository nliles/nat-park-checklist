import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import styles from "./index.module.scss";

const CircularProgressBar = ({ count, total }: { count: number, total: number }) => {
  const percentage = Math.floor((count / total) * 100);
  return (
    <div className={styles.wrapper}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={10}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "butt",
          textSize: "18px",
          pathTransitionDuration: 0.5,
          pathColor: "#4b5e26",
          textColor: "#4b5e26",
          trailColor: "#eae3d1",
          backgroundColor: "#4b5e26",
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
