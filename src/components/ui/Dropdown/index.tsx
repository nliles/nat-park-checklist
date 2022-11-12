import React from "react";
import { useSelect } from "downshift";
import styles from "./index.module.scss";
import cn from "classnames";

type DropdownType = {
  handleClick: (item: string) => void;
  list: string[];
  initialSelectedItem: string;
  styleName?: string;
  formatListItem: (item: string) => void;
};

const Dropdown = ({
  handleClick,
  list,
  initialSelectedItem,
  styleName,
  formatListItem,
}: DropdownType) => {
  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useSelect({
    items: list,
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
        <span className={styles.title}>{initialSelectedItem}</span>
        <span className={styles.icon}>
          <span className={styles.caret} />
        </span>
      </button>
      <ul className={styles.list} role="listbox" {...getMenuProps()}>
        {list.map((item, index) => (
          <li
            className={cn(styles.listItem, {
              [styles.selected]: item === initialSelectedItem,
              [styles.highlighted]: index === highlightedIndex,
            })}
            id={item}
            key={item}
            {...getItemProps({ item, index })}
          >
            {formatListItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
