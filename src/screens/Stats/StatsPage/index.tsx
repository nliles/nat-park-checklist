import { ParkData } from "types/park";
import { SelectedParks } from "types";
import Header from "components/Header";
import StatsMap from "../StatsMap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import DataTable from "screens/Stats/DataTable";
import DataBars from "screens/Stats/DataBars";
import styles from "./StatsPage.module.scss";

type StatsPageProps = {
  selected: SelectedParks;
  parks?: ParkData;
  total: number;
};

const StatsPage = ({ selected, parks, total }: StatsPageProps) => {
  const totalParks = Object.values(selected).flat(1);
  console.log(selected, parks);
  const percentage = Math.floor((totalParks.length / total) * 100);
  return (
    <div>
      <Header title="My Park Stats" />
      <div className={styles.section}>
        <div className={styles.columnOne}>
          <div className={styles.percentText}>
            <span className={styles.total}>{`${percentage}%`}</span>
            <span>of parks visited</span>
          </div>
          <div className={styles.progress}>
            <div className={styles.wrapper}>
              <CircularProgressbar
                value={percentage}
                strokeWidth={50}
                styles={buildStyles({
                  strokeLinecap: "butt",
                  pathColor: "#4b5e26",
                  textColor: "#4b5e26",
                  trailColor: "#eae3d1",
                })}
              />
            </div>
          </div>
          <DataBars selected={selected} parks={parks} />
        </div>
        <div className={styles.columnTwo}>
          <StatsMap selectedParks={totalParks} parks={parks} />
          <DataTable selected={selected} parks={parks} total={total} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
