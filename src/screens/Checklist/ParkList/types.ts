import { ResponseKey } from 'enum/response'
import { Park } from "types/park";

export type ListProps = {
  parks: Park[];
  selectedDropdownItem: string;
  initialParkValues: string[];
  handleOnChange: (values: string[]) => void;
  handleOnSubmit: (values: string[]) => void;
  saveFormRes?: ResponseKey;
};
