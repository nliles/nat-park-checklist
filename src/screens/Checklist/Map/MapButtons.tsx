import { FaPlus, FaMinus } from "react-icons/fa";
import ResetZoom from "components/icons/ResetZoom";
import styles from "./Map.module.scss";

const MapButtons = () => (
  <div className={styles.buttons}>
    <button className={styles.home} id="home">
      <ResetZoom />
    </button>
    <div className={styles.plusMinus}>
      <button className={styles.plus} id="plus">
        <FaPlus aria-label="Zoom in" />
      </button>
      <button className={styles.minus} id="minus">
        <FaMinus aria-label="Zoom out" />
      </button>
    </div>
  </div>
);

export default MapButtons;
