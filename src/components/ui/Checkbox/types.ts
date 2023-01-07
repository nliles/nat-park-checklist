export type CheckboxProps = {
  id: string;
  label: string;
  name: string;
  handleOnChange: (value: string, checked: boolean) => void;
};
