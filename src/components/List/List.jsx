import React from "react";
import ListItem from './ListItem'
import styles from './List.module.css'

const List = ({ parks = [], handleChange }) => {
  return (
    <div className={styles.listContainer}>
      {parks && parks.map(park => (
        <ListItem key={park?.fullName} park={park} handleChange={handleChange}/>
        )
      )}
    </div>
  )
}

export default List;
