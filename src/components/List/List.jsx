import React from "react";
import ListItem from './ListItem'
import styles from './List.module.css'

const List = ({ parks = [], handleChange }) => {
  return (
    <div className={styles.listContainer}>
      {parks && parks.map((park, i) => (
        <ListItem key={park?.fullName} index={i} park={park} handleChange={handleChange}/>
        )
      )}
    </div>
  )
}

export default List;
