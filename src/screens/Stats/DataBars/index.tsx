import ProgressBar from "components/ui/ProgressBar";
import startCase from "lodash/startCase";
import getParkTotal from "helpers/getParkTotal";
import { DataBarsProps } from "./types";
import styles from "./index.module.scss";

const DataBars = ({ items }: DataBarsProps) => {
  const itemKeys = Object.keys(items);
  return (
    <div className={styles.container}>
      {itemKeys?.map((option) => {
        const total = getParkTotal(option);
        const completed = items[option]?.length || 0;
        const percentage = Math.round((completed / total) * 100);
        return (
          <div className={styles.progress} key={option}>
            <div className={styles.text}>
              <span>{startCase(option)}</span>
              <span className={styles.perc}>{`${percentage}%`}</span>
            </div>
            <ProgressBar completed={completed} total={total} />
          </div>
        );
      })}
    </div>
  );
};

export default DataBars;
