import { TOTAL_UNITS } from "../../../constants";
import { ParkDesignationType } from "enum/ParkDesignation";
import { Park } from "types/park";
import { SelectedParks } from "types";
import getParkTotal from "helpers/getParkTotal";
import Header from "components/Header";
import Map from "components/Map";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Tile from "../Tile";
import styles from "./index.module.scss";

type StatsPageProps = {
  selected: SelectedParks;
  parks: Park[];
};

const StatsPage = ({ selected, parks }: StatsPageProps) => {
  const totalParks = Object.values(selected).flat(1);
  const percentage = Math.floor((totalParks.length / TOTAL_UNITS) * 100);
  const itemKeys = Object.keys(selected) as ParkDesignationType[];
  return (
    <div>
      <Header title="My Park Stats" />
      <div className={styles.section}>
        <div className={styles.columnOne}>
        <div className={styles.progressContainer}>
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
          </div>
        </div>
        <div className={styles.columnTwo}>
          <div className={styles.mapContainer}>
            <Map
              defaultWidth={0}
              selectedParks={totalParks}
              parks={parks}
              showTree={false}
              showBorder={false}
            />
          </div>
        </div>
      </div>
    <div className={styles.tileContainer}>
      {itemKeys?.map((option) => <Tile title={option} total={getParkTotal(option)} completed={selected[option]?.length || 0}/>)}
    </div>
    </div>
  );
};

export default StatsPage;
