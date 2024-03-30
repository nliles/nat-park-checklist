import React from "react";
import cn from "classnames";
import Close from "components/icons/Close";
import { useSelect } from "downshift";
import Caret from "components/icons/Caret";
import styles from "./Dropdown.module.scss";
import copy from "./copy";

type DropdownProps = {
  handleClick: ({
    designation,
    state,
  }: {
    designation?: string | null;
    state?: string | null;
  }) => void;
  label?: string;
  items: { name: string, value: string}[];
  initialSelectedItem?: string;
  className?: string;
  formatListItem?: (item: string) => string;
  formatSelectedItem?: (item: { name: string; value: string }) => string;
  keyValue: string;
};

const Dropdown = ({
  handleClick,
  label = copy.defaultLabel,
  items,
  initialSelectedItem,
  className,
  formatListItem = (item: string) => item,
  formatSelectedItem = (item: { name: string; value: string }) => item.value,
  keyValue,
}: DropdownProps) => {
  const foundItem = items.find(item => item.value === initialSelectedItem)
  const {
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
    selectItem,
    selectedItem,
  } = useSelect({
    defaultSelectedItem: foundItem,
    items: items,
    onSelectedItemChange: ({ selectedItem }) => {
      if (keyValue) {
        handleClick({ [keyValue]: selectedItem?.value || "" });
      }
    },
  });

  const clearItem = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    selectItem(null);
  };

  return (
    <div
      className={cn(styles.container, className, {
        [styles.isOpen]: isOpen,
      })}
    >
      <button
        className={styles.button}
        type="button"
        {...getToggleButtonProps()}
      >
        <label
          className={cn(styles.label, {
            [styles.isOpen]: isOpen || selectedItem,
          })}
        >
          {label}
        </label>
        <span className={styles.title}>
          {selectedItem ? formatSelectedItem(selectedItem) : ""}
        </span>
        <div className={styles.iconContainer}>
          {selectedItem && (
            <span
              className={cn(styles.clearIcon, {
                [styles.isOpen]: isOpen,
              })}
              onClick={clearItem}
            >
              <Close color="#4b5e26" size={22.5} />
            </span>
          )}
          <span
            className={cn(styles.icon, {
              [styles.isOpen]: isOpen,
            })}
          >
            <Caret />
          </span>
        </div>
      </button>
      <ul className={styles.list} role="listbox" {...getMenuProps()}>
        {items.map((item, index) => (
          <li
            className={cn(styles.listItem, {
              [styles.selected]: item === selectedItem,
              [styles.highlighted]: index === highlightedIndex,
            })}
            key={item.value}
            {...getItemProps({ item, index })}
          >
            {formatListItem ? formatListItem(item.value) : item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
