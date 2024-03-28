import { TOTAL_UNITS } from "../../../constants";
import { Park } from "types/park";
import { SelectedParks } from "types";
import Header from "components/Header";
import Map from "components/Map";
import CircularProgressBar from "components/ui/CircularProgressBar";
import DataTable from "screens/Stats/DataTable";
import DataBars from "screens/Stats/DataBars";
import Count from "screens/Stats/StatsPage/Count";
import styles from "./index.module.scss";

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
          <div className={styles.total}>
            <Count
              percentage={percentage}
            />
            <div className={styles.progress}>
              <CircularProgressBar
                percentage={percentage}
              />
            </div>
          </div>
          <DataBars items={selected} />
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
