import cn from "classnames";
import styles from "./index.module.scss";

type TooltipProps = {
  hoverText: string;
  tooltipText: string;
};

const Tooltip = ({ hoverText, tooltipText }: TooltipProps) => {
  return (
    <div className={styles.tooltip}>
      {hoverText}
      <div
      className={cn(styles.tooltipBaseStyle, styles.tooltipContent)}>
         {tooltipText}
      </div>
    </div>
  );
};

export default Tooltip;
