import cn from "classnames";
import { NAT_PARK_TOTAL_LINK } from "../../constants";
import Tooltip from "components/Tooltip";
import styles from "./index.module.scss";

type TotalProps = {
  count: number;
  total: number;
  tooltipText: string;
  styleName?: string;
};

const Total = ({ count, total, tooltipText, styleName }: TotalProps) => {
  return (
    <div className={cn(styles.count, styleName)}>
      <Tooltip hoverText={count.toString()} tooltipText={tooltipText} /> out of{" "}
      <a className={styles.link} href={NAT_PARK_TOTAL_LINK}>
        {total}
      </a>
    </div>
  );
};

export default Total;
