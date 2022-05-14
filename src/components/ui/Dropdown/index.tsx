import React, { useRef, useEffect, useState } from "react";
import { PARK_CODES } from "../../../constants";
import { removeDashes } from "../../../helpers";
import styles from './index.module.scss'
import cn from 'classnames';

type DropdownType = {
  handleClick: (item: string) => void,
  list: string[],
  selectedItem: string,
}

const Dropdown = ({ handleClick, list, selectedItem }: DropdownType) => {
  const myRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
      if (myRef?.current && !myRef.current.contains(e.target as Node)) {
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
    onClick={handleOpen}
    onKeyDown={e => {
        if (e.key === 'Enter') {
          handleOpen()
        }
      }}
    tabIndex={0}>
      <div className={styles.header}>
        <div className={styles.title}>{`${removeDashes(selectedItem)}s`}</div>
        <div className={styles.icon}><span className={styles.caret}/></div>
      </div>
      <ul className={styles.list}>
        {list.map(item => (
            <li tabIndex={0} key={item} onClick={() => handleClick(item)} className={cn(styles.listItem, {
              [styles.selected]: item === selectedItem
            })}>{`${removeDashes(item)}s (${PARK_CODES[item].length})`}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dropdown;
