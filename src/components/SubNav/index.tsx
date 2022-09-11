import Dropdown from "../ui/Dropdown";
import { LIST_OPTIONS } from "../../constants";
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
    <Dropdown
      list={LIST_OPTIONS}
      initialSelectedItem={selectedDropdownItem}
      handleClick={handleListItemChange}
    />
  </div>
);

export default SubNav;
