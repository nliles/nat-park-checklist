import Dropdown from "../ui/Dropdown";
import { LIST_OPTIONS, PARK_CODES, FORMATTED_PARKS } from "../../constants";
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
  const total = [
    ...Object.values(PARK_CODES),
    ...Object.values(FORMATTED_PARKS),
  ].reduce((acc, element) => acc + element.length, 0);
  return (
    <div className={styles.container}>
      <span className={styles.count}>
        <strong>{selectedParks.length}</strong> out of {total}
      </span>
      <Dropdown
        list={LIST_OPTIONS}
        selectedItem={selectedDropdownItem}
        handleClick={handleListItemChange}
      />
    </div>
  );
};

export default SubNav;
