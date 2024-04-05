import ParkDesignation from "enum/ParkDesignation";
import ProgressBar from "components/ui/ProgressBar";
import startCase from "lodash/startCase";
import { Park } from "types/park";
import getParkTotal from "helpers/getParkTotal";
import { SelectedParks } from "types";
import styles from "./DataBars.module.scss";

type DataBarsProps = {
  selected: SelectedParks;
  parks: Park[];
};

const DataBars = ({ selected, parks }: DataBarsProps) => {
  const itemKeys = Object.keys(selected) as ParkDesignation[];
  return (
    <div className={styles.container}>
      {itemKeys?.map((option) => {
        const total = getParkTotal(option, parks);
        const completed = selected[option].length;
        const percentage = Math.round((completed / total) * 100);
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
