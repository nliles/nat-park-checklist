import React, { useState } from "react";
import List from "../List/List";
import Map from "../Map/Map";
import Spinner from "../Spinner/Spinner";
import { useParks } from "../../hooks"
import styles from './ListContainer.module.scss'

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
      <Map data={parks} selected={selected}/>
      <List parks={parks} count={selected.length} handleChange={handleSelected} />
      </>
    )}
    </div>
  )
}

export default ListContainer;
