import { FaPlus, FaMinus } from "react-icons/fa";
import ResetZoom from "components/icons/ResetZoom";
import styles from "./Map.module.scss";

const MapButtons = () => (
  <div className={styles.buttons}>
    <button className={styles.home} id="home" aria-label="Reset zoom">
      <ResetZoom />
    </button>
    <div className={styles.plusMinus}>
      <button className={styles.plus} id="plus" aria-label="Zoom in">
        <FaPlus />
      </button>
      <button className={styles.minus} id="minus" aria-label="Zoom out">
        <FaMinus />
      </button>
    </div>
  </div>
);

export default MapButtons;
