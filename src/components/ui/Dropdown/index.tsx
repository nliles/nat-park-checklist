import React from "react";
import cn from "classnames";
import { useSelect } from "downshift";
import Caret from "components/icons/Caret";
import styles from "./Dropdown.module.scss";

type DropdownProps = {
  handleClick: (item: string) => void;
  items: string[];
  initialSelectedItem: string;
  styleName?: string;
  formatListItem?: (item: string) => string;
  formatSelectedItem?: (item: string) => string;
};

const Dropdown = ({
  handleClick,
  items,
  initialSelectedItem,
  styleName,
  formatListItem = (item: string) => item,
  formatSelectedItem = (item: string) => item,
}: DropdownProps) => {
  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useSelect({
    items: items,
    onStateChange: ({ selectedItem }) => {
      if (selectedItem) {
        handleClick(selectedItem);
      }
    },
  });

  return (
    <div
      className={cn(styles.container, styleName, {
        [styles.isOpen]: isOpen,
      })}
    >
      <button
        className={styles.button}
        type="button"
        {...getToggleButtonProps()}
      >
        <label className={styles.label}>Select a designation</label>
        <span className={styles.title}>
          {formatSelectedItem(initialSelectedItem)}
        </span>
        <span
          className={cn(styles.icon, {
            [styles.isOpen]: isOpen,
          })}
        >
          <Caret />
        </span>
        
      </button>
      <ul className={styles.list} role="listbox" {...getMenuProps()}>
        {items.map((item, index) => (
          <li
            className={cn(styles.listItem, {
              [styles.selected]: item === initialSelectedItem,
              [styles.highlighted]: index === highlightedIndex,
            })}
            id={item}
            key={item}
            {...getItemProps({ item, index })}
          >
            {formatListItem ? formatListItem(item) : item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
