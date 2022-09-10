import Dropdown from "../ui/Dropdown";
import { LIST_OPTIONS, PARK_INFO } from "../../constants";
import Total from "./Total";
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
    <Total count={selectedParks.length} />
    <Dropdown
      list={LIST_OPTIONS}
      selectedItem={selectedDropdownItem}
      handleClick={handleListItemChange}
    />
  </div>
);

export default SubNav;
