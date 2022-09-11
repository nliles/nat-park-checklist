import { TOTAL_UNITS } from "../../constants";
import ScreenReaderText from "../ui/ScreenReaderText"
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
      <ScreenReaderText text="Link to national park info in new tab"/>
    </a>
  </span>
);

export default Total;
