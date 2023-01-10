import React from "react";
import cn from "classnames";
import { useSelect } from "downshift";
import { DropdownProps } from "./types";
import styles from "./index.module.scss";

const Dropdown = ({
  handleClick,
  list,
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
        <span className={styles.title}>
          {formatSelectedItem(initialSelectedItem)}
        </span>
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
            {formatListItem ? formatListItem(item) : item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
