import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import styles from "./index.module.scss";
import startCase from "lodash/startCase";
import "react-circular-progressbar/dist/styles.css";

type StatsPageProps = {
  completed: number;
  total: number;
  title: string;
};

const Tile = ({ completed, total, title }: StatsPageProps) => {
  const percentage = Math.floor((completed / total) * 100);
  return (
        <div className={styles.tile}>             
            <span className={styles.tileHeader}>{`${startCase(title)}s`}</span>
        <div className={styles.tileContent}>
        <div className={styles.testOne}>
            <div className={styles.tileWrapper}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                textSize: '2rem',
                strokeLinecap: "round",
                textColor: "#4b5e26",
                pathColor: "#4b5e26",
                trailColor: "#a8c686",
                })}
            />
        </div>
        </div>
        <div className={styles.testTwo}>
        <p><span className={styles.blockCount}><span className={styles.boldCount}>{completed}</span>{' '}</span>{`out of ${total}`}</p>
        </div>
        </div>
        </div>
  );
};

export default Tile;
