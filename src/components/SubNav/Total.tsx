import { TOTAL_UNITS } from "../../constants";
import styles from "./index.module.scss";

type TotalType = {
  count: number;
};
const Total = ({ count }: TotalType) => (
  <span className={styles.count}>
    Total: <strong>{count}</strong> out of{" "}
    <a
      className={styles.link}
      target="_blank"
      rel="noopener"
      href="https://www.nps.gov/aboutus/national-park-system.htm"
    >
      {TOTAL_UNITS}
      <span className={styles.screenReader}>
        Link to national park info in new tab
      </span>
    </a>
  </span>
);

export default Total;
