import { ResponseKey } from "enum/Response";
import { Park } from "types/park";

export type ListProps = {
  parks: Park[];
  selectedDropdownItem: string;
  initialParkValues: string[];
  handleOnChange: (value: string, checked: boolean) => void;
  handleOnSubmit: (values: string[]) => void;
  saveFormRes?: ResponseKey;
};
