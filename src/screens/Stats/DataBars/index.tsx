import ParkDesignation from "enum/ParkDesignation";
import ProgressBar from "components/ui/ProgressBar";
import startCase from "lodash/startCase";
import { ParkData } from "types/park";
import { SelectedParks } from "types";
import styles from "./DataBars.module.scss";

type DataBarsProps = {
  selected: SelectedParks;
  parks?: ParkData;
};

const DataBars = ({ selected, parks }: DataBarsProps) => {
  const itemKeys = Object.keys(selected) as ParkDesignation[];
  return (
    <div className={styles.container}>
      {itemKeys?.map((option) => {
        const total = parks?.[option].length || 0;
        const completed = selected[option].length;
        const percentage = Math.round((completed / total) * 100) || 0;
        return (
          <div className={styles.progress} key={option}>
            <div className={styles.text}>
              <span>{`${startCase(option)}s`}</span>
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
