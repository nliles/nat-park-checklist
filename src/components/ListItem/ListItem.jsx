import React from "react";
import styles from './ListItem.module.scss'

const ListItem = ({ park = {}, handleChange, index = 0 }) => {
  const label = `${index + 1}. ${park?.fullName}`
  const name = park.fullName
  return (
    <div key={name}>
    <label className={styles.container} htmlFor={name}>
      {label}
      <input
      className={styles.checkbox}
      onChange={() => handleChange(park.id) }
      type="checkbox"
      id={name}
      name={name}/>
      <span className={styles.checkmark}></span>
      </label>
    </div>
  )
}

export default ListItem;
