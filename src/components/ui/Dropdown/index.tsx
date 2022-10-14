import React from "react";
import { PARK_INFO } from "../../../constants";
import { useSelect } from "downshift";
import startCase from "lodash/startCase";
import styles from "./index.module.scss";
import cn from "classnames";

type DropdownType = {
  handleClick: (item: string) => void;
  list: string[];
  initialSelectedItem: string;
  styleName?: string;
};

const Dropdown = ({
  handleClick,
  list,
  initialSelectedItem,
  styleName,
}: DropdownType) => {
  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
    selectedItem,
  } = useSelect({
    items: list,
    onStateChange: ({ selectedItem }) => {
      if (selectedItem) {
        handleClick(selectedItem);
      }
    }
  });

  const formatListItem = (item: string) => {
    const count =
      PARK_INFO[item].codes.length + PARK_INFO[item].formattedParks.length;
    return `${startCase(item)}s (${count})`;
  };

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
        <span className={styles.title}>{`${startCase(
          selectedItem || initialSelectedItem
        )}s`}</span>
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
