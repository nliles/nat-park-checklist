import { TOTAL_UNITS } from "../../constants";
import ScreenReaderText from "components/ui/ScreenReaderText"
import styles from "./index.module.scss";
import cn from "classnames";

type TotalType = {
  count: number;
  total: number;
  styleName?: string;
};
const Total = ({ count, total, styleName }: TotalType) => (
  <span className={cn(styles.count, styleName)}>
    <strong>{count}</strong> out of{" "}
    <a
      className={styles.link}
      target="_blank"
      rel="noopener"
      href="https://www.nps.gov/aboutus/national-park-system.htm"
    >
      {total}
      <ScreenReaderText text="Link to national park info in new tab"/>
    </a>
  </span>
);

export default Total;
