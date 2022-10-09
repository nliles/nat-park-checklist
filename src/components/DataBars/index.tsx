import cn from "classnames";
import { TOTAL_UNITS, LIST_OPTIONS, PARK_INFO } from "../../constants";
import ProgressBar from "components/ui/ProgressBar";
import { removeDashes } from "helpers";
import styles from "./index.module.scss";

const getTotal = (park: string) => {
  return [...Object.values(PARK_INFO[park])].reduce(
    (acc, element) => acc + element.length,
    0
  );
};

const DataBars = () => {
  return (
    <div className={styles.container}>
      {LIST_OPTIONS.map((option) => {
        const total = getTotal(option);
        const percentage = Math.round((1 / total) * 100);
        return (
          <div className={styles.progress} key={option}>
            <div className={styles.text}>
              <span>{removeDashes(option)}</span>
              <span className={styles.perc}>{`${percentage}%`}</span>
            </div>
            <ProgressBar completed={1} total={total} />
          </div>
        );
      })}
    </div>
  );
};

export default DataBars;
