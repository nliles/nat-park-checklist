import { useLayoutEffect, useRef, useState } from "react";
import PageWrapper from "components/PageWrapper";
import { useSelectedParks, useWindowResize } from "hooks";
import { TOTAL_UNITS, LIST_OPTIONS, PARK_INFO } from "../../constants";
import Header from "components/Header";
import { CircularProgressbar } from "react-circular-progressbar";
import CircularProgressBar from "components/CircularProgressBar";
import DataTable from "components/DataTable";
import DataBars from "components/DataBars";
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
          <DataBars />
        </div>
        <div className={styles.columnTwo} ref={columnRef}>
          <Map
            fixedWidth={columnWidth}
            selectedParks={selected}
            parks={parks}
            showTree={false}
          />
          <DataTable count={count} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
