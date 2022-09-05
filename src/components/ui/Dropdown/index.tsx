import React, { useRef, useEffect, useState, KeyboardEvent } from "react";
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (myRef?.current && !myRef.current.contains(e.target as Node)) {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const formatListItem = (item: string) =>
    `${removeDashes(item)}s (${PARK_CODES[item].length})`;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Event handler for keydowns
  const handleListItemKeyDown = (item: string) => (e: KeyboardEvent) => {
    console.log("handle list item key down");
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

  const handleListKeyDown = (e: KeyboardEvent) => {
    console.log("handle list key down", e);
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
      ref={myRef}
    >
      <div
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={styles.button}
        role="button"
        onClick={handleOpen}
        onKeyDown={handleListKeyDown}
        tabIndex={0}
      >
        <span className={styles.title}>{`${removeDashes(selectedItem)}s`}</span>
        <span className={styles.icon}>
          <span className={styles.caret} />
        </span>
      </div>
      <ul
        className={styles.list}
        role="listbox"
        aria-activedescendant={selectedItem}
        tabIndex={-1}
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
            onKeyDown={() => handleListItemKeyDown(item)}
            onClick={() => handleClick(item)}
            role="option"
          >
            {formatListItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
