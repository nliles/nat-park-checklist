import cn from "classnames";
import { TotalProps } from "./types";
import { NAT_PARK_TOTAL_LINK } from "../../constants";
import styles from "./index.module.scss";

const Total = ({ count, total, styleName }: TotalProps) => {
  return (
    <span className={cn(styles.count, styleName)}>
      <strong>{count}</strong> out of{" "}
      <a
        className={styles.link}
        target="_blank"
        rel="noreferrer"
        href={NAT_PARK_TOTAL_LINK}
      >
        {total}
      </a>
    </span>
  );
};

export default Total;
