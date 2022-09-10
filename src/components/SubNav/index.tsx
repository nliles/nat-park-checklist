import Dropdown from "../ui/Dropdown";
import { LIST_OPTIONS, PARK_INFO } from "../../constants";
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
  const total = [...Object.values(PARK_INFO)].reduce(
    (acc, element) =>
      acc + element.codes.length + element.formattedParks.length,
    0
  );
  Object.values(PARK_INFO);
  return (
    <div className={styles.container}>
      <span className={styles.count}>
        Total: <strong>{selectedParks.length}</strong> out of {total}
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
