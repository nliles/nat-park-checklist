import { useLayoutEffect, useRef, useState } from "react";
import { useWindowResize } from "hooks";
import { TOTAL_UNITS } from "../../../constants";
import Header from "components/Header";
import CircularProgressBar from "components/ui/CircularProgressBar";
import DataTable from "screens/Stats/DataTable";
import DataBars from "screens/Stats/DataBars";
import { Park } from "types";
import Count from "./Count";
import Map from "components/Map";
import styles from "./index.module.scss";

const StatsPage = ({
  selected,
  parks,
}: {
  selected: string[];
  parks: Park[];
}) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const [columnWidth, setColumnWidth] = useState(0);
  const [width] = useWindowResize();
  const count = selected.length;

  useLayoutEffect(() => {
    if (columnRef?.current) {
      setColumnWidth(columnRef.current.offsetWidth);
    }
  }, [width]);

  return (
    <div>
      <Header title="My Stats" />
      <div className={styles.section}>
        <div className={styles.columnOne}>
          <Count count={count} total={TOTAL_UNITS} />
          <div className={styles.progress}>
            <CircularProgressBar count={count} />
          </div>
          <div className={styles.mobile}>
            <Map
              fixedWidth={columnWidth}
              selectedParks={selected}
              parks={parks}
              showTree={false}
            />
          </div>
          <DataBars />
        </div>
        <div className={styles.columnTwo} ref={columnRef}>
          <div className={styles.desktop}>
            <Map
              fixedWidth={columnWidth}
              selectedParks={selected}
              parks={parks}
              showTree={false}
            />
          </div>
          <DataTable count={count} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
