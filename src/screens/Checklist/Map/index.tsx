import { Park } from "types/park";
import { FaHome, FaPlus, FaMinus } from "react-icons/fa";
import useContainerWidth from "hooks/useContainerWidth";
import useTooltip from "screens/Checklist/Map/hooks/useTooltip";
import useMap from "screens/Checklist/Map/hooks/useMap";
import styles from "./Map.module.scss";

const Map = ({ parks = [] }: { parks: Park[]}) => {
  const { containerRef, width, height } = useContainerWidth();
  useTooltip();
  useMap({ width, height, parks })
  
  return (
    <div ref={containerRef} className={styles.mapContainer} id="mapContainer">
    <div className={styles.buttons}>
      <button className={styles.home} id="home">
        <FaHome aria-label="Instagram" />
      </button>
      <div className={styles.plusMinus}>
       <button className={styles.plus} id="plus">
        <FaPlus aria-label="Instagram" />
      </button>
      <button className={styles.minus} id="minus">
        <FaMinus aria-label="Instagram" />
      </button> 
      </div>
    </div>
    </div>
  );
};

export default Map;
