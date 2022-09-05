import React, { useRef, useEffect, useState } from "react";
import { PARK_CODES } from "../../../constants";
import { removeDashes } from "../../../helpers";
import styles from "./index.module.scss";
import cn from "classnames";

type DropdownType = {
  handleClick: (item: string) => void;
  list: string[];
  selectedItem: string;
};

const Dropdown = ({ handleClick, list, selectedItem }: DropdownType) => {
  const myRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<any>(-1);

  const handleClickOutside = (e: MouseEvent) => {
    if (myRef?.current && !myRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Event handler for keydowns
  const handleListItemKeyDown = (item: string) => (e: any) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        handleClick(item);
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: any) => {
    let newIndex = activeIndex;
    switch (e.key) {
      case "Enter":
      case "Escape":
        handleOpen();
        break;
      case "ArrowUp":
        e.preventDefault();
        newIndex = activeIndex === 0 ? list.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
        break;
      case "ArrowDown":
        e.preventDefault();
        newIndex = activeIndex === list.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.isOpen]: isOpen,
      })}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      ref={myRef}
      role="button"
      onClick={handleOpen}
      onKeyDown={handleListKeyDown}
      tabIndex={0}
    >
      <div className={styles.header}>
        <div className={styles.title}>{`${removeDashes(selectedItem)}s`}</div>
        <div className={styles.icon}>
          <span className={styles.caret} />
        </div>
      </div>
      <ul
        className={styles.list}
        role="listbox"
        aria-activedescendant={selectedItem}
        onKeyDown={handleListKeyDown}
      >
        {list.map((item, index) => (
          <li
            className={cn(styles.listItem, {
              [styles.selected]: item === selectedItem,
              [styles.active]: index === activeIndex,
            })}
            aria-selected={selectedItem == item}
            tabIndex={0}
            key={item}
            onKeyDown={handleListItemKeyDown(item)}
            onClick={() => handleClick(item)}
            role="option"
          >{`${removeDashes(item)}s (${PARK_CODES[item].length})`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
