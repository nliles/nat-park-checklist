import cn from "classnames";
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
        target="_blank"
        rel="noreferrer"
        href="https://www.nps.gov/aboutus/national-park-system.htm"
      >
        {total}
      </a>
    </span>
  );
};

export default Total;
