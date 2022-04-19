import React from "react";
import styles from './ListItem.module.css'

const ListItem = ({ park = {}, handleChange, index = 0 }) => {
  return (
    <div key={park?.fullName}>
    <label className={styles.container} htmlFor={park?.fullName}><span>{index + 1}.{' '}</span>{park?.fullName}
      <input
      className={styles.checkbox}
      onChange={() => handleChange(park) }
      type="checkbox"
      id={park?.fullName}
      name={park?.fullName}
      value="Bike"/>
      <span className={styles.checkmark}></span>
      </label>
    </div>
  )
}

export default ListItem;
