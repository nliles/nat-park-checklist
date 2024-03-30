import { TOTAL_UNITS } from "../../../constants";
import { Park } from "types/park";
import { SelectedParks } from "types";
import Header from "components/Header";
import StatsMap from "../StatsMap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import DataTable from "screens/Stats/DataTable";
import DataBars from "screens/Stats/DataBars";
import styles from "./StatsPage.module.scss";

type StatsPageProps = {
  selected: SelectedParks;
  parks: Park[];
};

const StatsPage = ({ selected, parks }: StatsPageProps) => {
  const totalParks = Object.values(selected).flat(1);
  const percentage = Math.floor((totalParks.length / TOTAL_UNITS) * 100);
  return (
    <div>
      <Header title="My Park Stats" />
      <div className={styles.section}>
        <div className={styles.columnOne}>
          <div className={styles.container}>
            <span className={styles.total}>{`${percentage}%`}</span>
            <span>of units visited</span>
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
                  backgroundColor: "#4b5e26",
                })}
              />
            </div>
          </div>
          <DataBars items={selected} />
        </div>
        <div className={styles.columnTwo}>
          <div className={styles.mapContainer}>
            <StatsMap selectedParks={totalParks} parks={parks} />
          </div>
          <DataTable
            count={totalParks.length}
            total={TOTAL_UNITS}
            items={selected}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
