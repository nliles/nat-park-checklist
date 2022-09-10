import Dropdown from "../ui/Dropdown";
import { LIST_OPTIONS, PARK_INFO, TOTAL_UNITS } from "../../constants";
import styles from "./index.module.scss";

type SubNavType = {
  handleListItemChange: (item: string) => void;
  selectedParks: string[];
  selectedDropdownItem: string;
};
const SubNav = ({
  selectedParks,
  selectedDropdownItem,
  handleListItemChange,
}: SubNavType) => (
  <div className={styles.container}>
    <span className={styles.count}>
      Total: <strong>{selectedParks.length}</strong> out of{" "}
      <a
        className={styles.link}
        target="_blank"
        rel="noopener"
        href="https://www.nps.gov/aboutus/national-park-system.htm"
      >
        {TOTAL_UNITS}
        <span className={styles.screenReader}>
          Link to national park info in new tab
        </span>
      </a>
    </span>
    <Dropdown
      list={LIST_OPTIONS}
      selectedItem={selectedDropdownItem}
      handleClick={handleListItemChange}
    />
  </div>
);

export default SubNav;
