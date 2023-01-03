import cn from "classnames";
import { TotalProps } from './types';
import styles from "./index.module.scss";

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
