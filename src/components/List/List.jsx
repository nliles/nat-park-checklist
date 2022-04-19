import React from "react";
import ListItem from '../ListItem/ListItem'
import styles from './List.module.scss'

const List = ({ parks = [], count, handleChange }) => {
  return (
  <div className={styles.container}>
    <h2>Checklist <span className={styles.count}>{count ? `${count} out of ${parks.length}` : ''}</span></h2>
    <div className={styles.listContainer}>
      {parks && parks.map((park, i) => (
        <ListItem key={park?.fullName} index={i} park={park} handleChange={handleChange}/>
        )
      )}
    </div>
  </div>
  )
}

export default List;
