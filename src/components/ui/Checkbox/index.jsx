import React from "react";
import styles from './index.module.scss'

const Checkbox = ({ id, handleChange, label, checked }) => {
  return (
    <div>
    <label className={styles.checkboxWrapper} htmlFor={id}>
      {label}
      <input
      className={styles.checkbox}
      checked={checked}
      onChange={() => handleChange(id) }
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleChange(id)
        }
      }}
      type="checkbox"
      id={id}
      name={id}
      />
      <span aria-hidden={true} className={styles.checkmark}/>
      </label>
    </div>
  )
}

export default Checkbox;
