import { LIST_OPTIONS, PARK_INFO } from "../../../constants";
import ProgressBar from "components/ui/ProgressBar";
import startCase from "lodash/startCase";
import { Parks } from "types";
import styles from "./index.module.scss";

const getTotal = (park: string) => {
  return [...Object.values(PARK_INFO[park])].reduce(
    (acc, element) => acc + element.length,
    0
  );
};

const DataBars = ({ selected }: { selected: Parks }) => {
  return (
    <div className={styles.container}>
      {LIST_OPTIONS.map((option) => {
        const total = getTotal(option);
        const completed = selected[option]?.length || 0;
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
