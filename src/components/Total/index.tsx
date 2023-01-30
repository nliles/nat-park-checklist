import cn from "classnames";
import { NAT_PARK_TOTAL_LINK } from "../../constants";
import styles from "./index.module.scss";

type TotalProps = {
  count: number;
  total: number;
  styleName?: string;
};

const Total = ({ count, total, styleName }: TotalProps) => {
  return (
    <span className={cn(styles.count, styleName)}>
      <strong>{count}</strong> out of{" "}
      <a
        className={styles.link}
        href={NAT_PARK_TOTAL_LINK}
      >
        {total}
      </a>
    </span>
  );
};

export default Total;
