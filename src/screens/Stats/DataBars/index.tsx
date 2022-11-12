import { LIST_OPTIONS, PARK_INFO } from "../../../constants";
import ProgressBar from "components/ui/ProgressBar";
import startCase from "lodash/startCase";
import { Parks } from "types";
import getParkTotal from "helpers/getParkTotal";
import styles from "./index.module.scss";

const DataBars = ({ selected }: { selected: Parks }) => {
  return (
    <div className={styles.container}>
      {LIST_OPTIONS.map((option) => {
        const total = getParkTotal(option);
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
