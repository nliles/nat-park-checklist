import React from "react";
import styles from './ListItem.module.scss'

const ListItem = ({ park = {}, handleChange, index = 0, selected }) => {
  const label = `${index + 1}. ${park?.fullName}`
  const isSelected = selected.includes(park.id)
  const name = park.fullName
  return (
    <div>
    <label className={styles.container} htmlFor={name}>
      {label}
      <input
      className={styles.checkbox}
      checked={isSelected}
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
