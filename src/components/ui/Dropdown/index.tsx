import React from "react";
import cn from "classnames";
import { useSelect } from "downshift";
import Caret from "components/icons/Caret";
import Close from "components/icons/Close";
import styles from "./Dropdown.module.scss";

type DropdownProps = {
  handleClick: (item?: string) => void;
  items: string[];
  initialSelectedItem?: string;
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
    selectItem,
    selectedItem,
    highlightedIndex,
    isOpen,
  } = useSelect({
    items: items,
    defaultSelectedItem: initialSelectedItem,
    onSelectedItemChange: ({ selectedItem }) => {
      handleClick(selectedItem as string | undefined);
		},
  });

  const clearItem = (e: any) => {
    e.stopPropagation();
    selectItem('');
  }

  console.log(selectedItem)

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
        <label className={cn(styles.label, {
          [styles.isOpen]: isOpen,
        })}>Select a designation</label>
        <span className={styles.title}>
          {selectedItem ? formatSelectedItem(selectedItem) : ''}
        </span>
        <div className={styles.iconContainer}>
        <button className={cn(styles.clearIcon, {
          [styles.isOpen]: isOpen,
        })} onClick={clearItem}>
          <Close color="#64726f" size={25}/>
        </button>
        <span
          className={cn(styles.clearIcon, {
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
