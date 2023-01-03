export type DropdownProps = {
  handleClick: (item: string) => void;
  list: string[];
  initialSelectedItem: string;
  styleName?: string;
  formatListItem: (item: string) => void;
};
