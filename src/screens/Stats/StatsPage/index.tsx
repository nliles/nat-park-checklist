import { TOTAL_UNITS } from "../../../constants";
import { Park } from "types/park";
import { Parks } from "types";
import flattenParks from "helpers/flattenParks";
import Header from "components/Header";
import Map from "components/Map";
import CircularProgressBar from "components/ui/CircularProgressBar";
import DataTable from "screens/Stats/DataTable";
import DataBars from "screens/Stats/DataBars";
import Count from "screens/Stats/StatsPage/Count";
import styles from "./index.module.scss";

type StatsPageProps = {
  selected: Parks;
  parks: Park[];
};

const StatsPage = ({ selected, parks }: StatsPageProps) => {
  const totalParks = flattenParks(selected);

  return (
    <div>
      <Header title="My Park Stats" />
      <div className={styles.section}>
        <div className={styles.columnOne}>
          <div className={styles.total}>
            <Count
              header="NPS units visited"
              count={totalParks.length}
              total={TOTAL_UNITS}
            />
            <div className={styles.progress}>
              <CircularProgressBar
                count={totalParks.length}
                total={TOTAL_UNITS}
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
