import { useLayoutEffect, useRef, useState } from "react";
import useWindowResize from "hooks/useWindowResize";
import { TOTAL_UNITS } from "../../../constants";
import { Park } from "types/park";
import { Parks } from "types";
import flattenParks from "helpers/flattenParks";
import Header from "components/Header";
import CircularProgressBar from "components/ui/CircularProgressBar";
import DataTable from "screens/Stats/DataTable";
import DataBars from "screens/Stats/DataBars";
import Count from "./Count";
import Map from "components/Map";
import styles from "./index.module.scss";

type StatsPageProps = {
  selected: Parks;
  parks: Park[];
};

const StatsPage = ({ selected, parks }: StatsPageProps) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const [columnWidth, setColumnWidth] = useState(0);
  const [width] = useWindowResize();
  const totalParks = flattenParks(selected);

  useLayoutEffect(() => {
    if (columnRef?.current) {
      setColumnWidth(columnRef.current.offsetWidth);
    }
  }, [width]);

  return (
    <div>
      <Header title="Parks Visited" />
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
          <div className={styles.mobile}>
            <Map
              fixedWidth={columnWidth}
              selectedParks={totalParks}
              parks={parks}
              showTree={false}
              styleName={styles.mapMobile}
            />
          </div>
          <DataBars items={selected} />
        </div>
        <div className={styles.columnTwo} ref={columnRef}>
          <div className={styles.desktop}>
            <Map
              fixedWidth={columnWidth}
              selectedParks={totalParks}
              parks={parks}
              showTree={false}
              styleName={styles.map}
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
