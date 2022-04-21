import React, { useState } from "react";
import List from "../List/List";
import Map from "../Map/Map";
import Spinner from "../Spinner/Spinner";
import { useParks } from "../../hooks"
import styles from './ListContainer.module.scss'
import { groupBy } from 'lodash';

const ListContainer = () => {
  const { loading, parks } = useParks()
  const [selected, setSelected] = useState([])

  const handleSelected = (park) => {
    const isSelected = selected.find(s => s.id === park.id)
    const newItems = [...selected]
    if (isSelected) {
      const index = selected.findIndex(s => s.id === park.id);
      newItems.splice(index, 1);
      setSelected(newItems);
    } else {
      newItems.push(park)
      setSelected(newItems);
    }
  }

  const parkKeys = [
    'National Park',
    'National Parks',
    'National Park and Preserve',
    'National Park & Preserve',
    'National and State Parks'
  ]

  const groupedParks = groupBy(parks, 'designation')
  let filteredParks = []
  for (let i in groupedParks) {
    if (parkKeys.includes(i)) {
      filteredParks = filteredParks.concat(groupedParks[i])
    }
    if (i === "") {
      const samoa = groupedParks[i].find(p => p.fullName === "National Park of American Samoa")
      filteredParks.push(samoa)
    }
  }

  return (
    <div className={styles.container}>
    <nav className={styles.nav}>
      <h1 className={styles.header}>US National Parks</h1>
    </nav>
    {loading &&
      <Spinner/>
    }
    {!loading && (
      <>
      <Map data={filteredParks} selected={selected}/>
      <List parks={filteredParks} count={selected.length} handleChange={handleSelected} />
      </>
    )}
    </div>
  )
}

export default ListContainer;
