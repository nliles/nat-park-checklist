import React, { useState } from "react";
import List from "../List/List";
import Map from "../Map/Map";
import Spinner from "../Spinner/Spinner";
import Dropdown from "../Dropdown/Dropdown";
import { useParks } from "../../hooks";
import { removeDashes } from "../../helpers";
import { groupBy } from 'lodash'
import styles from './ListContainer.module.scss';
import { LIST_OPTIONS, PARK_DESIGNATION_KEY } from "../../constants";

const ListContainer = () => {
  const [selectedListItem, setSelectedListItem] = useState(PARK_DESIGNATION_KEY.NAT_PARK)
  const [selected, setSelected] = useState([])
  const { loading, parks } = useParks(selectedListItem)
  // const found = groupBy(parks, 'designation')['National Recreation Area']
  // console.log(parks?.filter(p => p.fullName.includes("Chelan")))

  const handleListItemChange = (item) => {
    setSelectedListItem(item)
  }

  const handleSelected = (parkId) => {
    const isSelected = selected.includes(parkId)
    const newItems = [...selected]
    if (isSelected) {
      const index = selected.indexOf(parkId)
      newItems.splice(index, 1);
      setSelected(newItems);
    } else {
      newItems.push(parkId)
      setSelected(newItems);
    }
  }

  return (
    <div className={styles.container}>
    <nav className={styles.nav}>
      <h1 className={styles.header}>{`US ${removeDashes(selectedListItem)}s`}</h1>
    </nav>
    {loading &&
      <Spinner/>
    }
    {!loading && (
      <>
        <Dropdown list={LIST_OPTIONS} selectedItem={selectedListItem} handleClick={handleListItemChange} />
        <Map parks={parks} selected={selected}/>
        <List parks={parks} count={selected.length} handleChange={handleSelected} />
      </>
    )}
    </div>
  )
}

export default ListContainer;
