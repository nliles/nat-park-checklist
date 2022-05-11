import Count from "./Count";
import Dropdown from "../ui/Dropdown/Dropdown";
import { LIST_OPTIONS, PARK_CODES } from "../../constants";
import styles from './SubNav.module.scss';

const SubNav = ({ selected, selectedDropdownItem, handleListItemChange }) => {
  const total = Object.values(PARK_CODES).reduce((acc,element) => acc + element.length, 0);
  return (
    <div className={styles.container}>
      <Dropdown list={LIST_OPTIONS} selectedItem={selectedDropdownItem} handleClick={handleListItemChange} />
      <Count totalSelected={selected.length} total={total}/>
    </div>
  )
}

export default SubNav;
