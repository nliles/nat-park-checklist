import React, { useState } from "react";
import List from "../List/List";
import Map from "../Map/Map";
import Spinner from "../Spinner/Spinner";
import Dropdown from "../Dropdown/Dropdown";
import { useParks } from "../../hooks";
import { groupBy } from 'lodash';
import { removeDashes } from "../../helpers";
import styles from './ListContainer.module.scss';
import { LIST_OPTIONS, NAT_PARK } from "../../constants";

const ListContainer = () => {
  const [selectedListItem, setSelectedListItem] = useState(NAT_PARK)
  const [selected, setSelected] = useState([])
  const { loading, parks } = useParks(selectedListItem)
  console.log(parks)
  // const grouped = groupBy(parks, 'designation')['National Military Park']
  // console.log(grouped?.map(g => g.parkCode))

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
