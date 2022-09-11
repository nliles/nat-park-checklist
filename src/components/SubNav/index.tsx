import Dropdown from "../ui/Dropdown";
import { LIST_OPTIONS, TOTAL_UNITS } from "../../constants";
import Total from "../Total";
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
    <Total count={selectedParks.length} total={TOTAL_UNITS} styleName={styles.countMobile} showTotal/>
    <Dropdown
      list={LIST_OPTIONS}
      initialSelectedItem={selectedDropdownItem}
      handleClick={handleListItemChange}
      styleName={styles.dropdown}
    />
    <Total count={selectedParks.length} total={TOTAL_UNITS} styleName={styles.countDesktop}/>
  </div>
);

export default SubNav;
