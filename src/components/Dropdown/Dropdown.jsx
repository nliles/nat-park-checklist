import React, { useRef, useEffect, useState } from "react";
import { removeDashes } from "../../helpers";
import styles from './Dropdown.module.scss'
import cn from 'classnames';

const Dropdown = ({ list, selectedItem, handleClick = () => {} }) => {
  const myRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = e => {
      if (!myRef.current.contains(e.target)) {
          setIsOpen(false)
      }
  }

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <div className={cn(styles.wrapper, {
      [styles.isOpen]: isOpen
    })}
    ref={myRef}
    onClick={handleOpen} tabIndex={0}>
      <div className={styles.header}>
        <div className={styles.title}>{removeDashes(selectedItem)}</div>
        <div className={styles.icon}><span className={styles.caret}/></div>
      </div>
      <ul className={styles.list}>
        {list.map(item => (
            <li key={item} onClick={() =>handleClick(item)} className={cn(styles.listItem, {
              [styles.selected]: item === selectedItem
            })}>{removeDashes(item)}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown;
