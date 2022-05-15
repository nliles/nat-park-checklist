import Dropdown from "../ui/Dropdown";
import { LIST_OPTIONS, PARK_CODES } from "../../constants";
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
}: SubNavType) => {
  const total = Object.values(PARK_CODES).reduce(
    (acc, element) => acc + element.length,
    0
  );
  return (
    <div className={styles.container}>
      <Dropdown
        list={LIST_OPTIONS}
        selectedItem={selectedDropdownItem}
        handleClick={handleListItemChange}
      />
      <div className={styles.count}>
        <span>
          <strong>{selectedParks.length}</strong> out of {total}
        </span>
      </div>
    </div>
  );
};

export default SubNav;
