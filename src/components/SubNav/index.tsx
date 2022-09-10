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
      Total: <strong>{selectedParks.length}</strong> out of {TOTAL_UNITS}
    </span>
    <Dropdown
      list={LIST_OPTIONS}
      selectedItem={selectedDropdownItem}
      handleClick={handleListItemChange}
    />
  </div>
);

export default SubNav;
