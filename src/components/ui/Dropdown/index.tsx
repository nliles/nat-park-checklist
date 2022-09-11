import React, { useRef, useEffect, useState, KeyboardEvent } from "react";
import { PARK_INFO } from "../../../constants";
import { removeDashes } from "../../../helpers";
import styles from "./index.module.scss";
import cn from "classnames";

type DropdownType = {
  handleClick: (item: string) => void;
  list: string[];
  selectedItem: string;
  styleName?: string;
};

const Dropdown = ({ handleClick, list, selectedItem, styleName }: DropdownType) => {
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

  const formatListItem = (item: string) => {
    const count =
      PARK_INFO[item].codes.length + PARK_INFO[item].formattedParks.length;
    return `${removeDashes(item)}s (${count})`;
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Event handler for keydowns
  const handleListKeyDown = (item: string) => (e: KeyboardEvent) => {
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

  const handleKeyDown = (e: KeyboardEvent) => {
    let newIndex = activeIndex;
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        !isOpen && setIsOpen(true);
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
      className={cn(styles.container, styleName, {
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
        onKeyDown={handleKeyDown}
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
      >
        {list.map((item, index) => (
          <li
            aria-selected={item === selectedItem}
            className={cn(styles.listItem, {
              [styles.selected]: item === selectedItem,
              [styles.active]: index === activeIndex,
            })}
            id={item}
            key={item}
            onKeyUp={handleListKeyDown(item)}
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
