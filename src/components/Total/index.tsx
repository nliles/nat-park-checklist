import { NAT_PARK_TOTAL_LINK } from "../../constants";
import styles from "./Total.module.scss";

type TotalProps = {
  count: number;
  total: number;
};

const Total = ({ count, total }: TotalProps) => {
  return (
    <div className={styles.count}>
      <span><span className={styles.bold}>{count}</span>{" "}out of{" "}</span>
      <a className={styles.link} href={NAT_PARK_TOTAL_LINK}>
        {total}
      </a>
    </div>
  );
};

export default Total;
