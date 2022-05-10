import React from "react";
import List from "../List/List";
import Map from "../Map/Map";
import Spinner from "../ui/Spinner/Spinner";
import SubNav from "../SubNav/SubNav";
import { removeDashes } from "../../helpers";
import styles from './ParkView.module.scss';

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
        <SubNav selected={selected} selectedDropdownItem={selectedDropdownItem} handleListItemChange={handleListItemChange}/>
        <Map parks={parks} selected={selected}/>
        <List parks={parks} selected={selected} count={selected.length} handleChange={handleSelected} />
      </>
    )}
    </div>
  )
}

export default ParkView;
