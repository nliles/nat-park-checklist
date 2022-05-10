import React from "react";
import List from "../List/List";
import Map from "../Map/Map";
import Spinner from "../ui/Spinner/Spinner";
import Dropdown from "../ui/Dropdown/Dropdown";
import { removeDashes } from "../../helpers";
import styles from './ParkView.module.scss';
import { LIST_OPTIONS } from "../../constants";

const ParkView = ({ loading, parks, selected, selectedDropdownItem, handleListItemChange, handleSelected }) => {
  return (
    <div className={styles.container}>
    <nav className={styles.nav}>
      <h1 className={styles.header}>{`US ${removeDashes(selectedDropdownItem)}s`}</h1>
    </nav>
    {loading &&
      <Spinner/>
    }
    {!loading && (
      <>
        <Dropdown list={LIST_OPTIONS} selectedItem={selectedDropdownItem} handleClick={handleListItemChange} />
        <Map parks={parks} selected={selected}/>
        <List parks={parks} selected={selected} count={selected.length} handleChange={handleSelected} />
      </>
    )}
    </div>
  )
}

export default ParkView;
