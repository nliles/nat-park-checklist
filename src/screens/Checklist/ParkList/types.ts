import { ResponseKey } from "enum/Response";
import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";

export type ListProps = {
  parks: Park[];
  selectedDropdownItem: string;
  initialParkValues: string[];
  handleOnChange: (value: string, checked: boolean) => void;
  handleOnSubmit: () => void;
  saveFormRes?: ResponseKey;
};
