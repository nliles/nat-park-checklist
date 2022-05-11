import React from "react";
import ListItem from '../ListItem/ListItem'
import styles from './List.module.scss'

const List = ({ parks = [], selected = [], handleChange }) => {
  const count = parks.filter(p => selected.includes(p.id)).length
  const countDisplay =`${count} out of ${parks.length}`
  return (
  <div className={styles.container}>
    <h2>Checklist <span className={styles.count}>{countDisplay}</span></h2>
    <div className={styles.listContainer}>
      {parks && parks.map((park, i) => (
        <ListItem selected={selected} key={park.fullName} index={i} park={park} handleChange={handleChange}/>
        )
      )}
    </div>
  </div>
  )
}

export default List;
