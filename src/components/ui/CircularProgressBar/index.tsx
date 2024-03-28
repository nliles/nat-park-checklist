import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import styles from "./CircularProgressBar.module.scss";

type CircularProgressBarProps = {
  percentage: number;
};

const CircularProgressBar = ({ percentage }: CircularProgressBarProps) => {
  return (
    <div className={styles.wrapper}>
    <CircularProgressbar
      value={57}
      strokeWidth={50}
      styles={buildStyles({
        strokeLinecap: "butt",
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
