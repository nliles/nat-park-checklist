import { Park } from "types/park";
import { ResponseKey } from "enum/Response";

export type ParkViewProps = {
  handleListItemChange: (item: string) => void;
  loading?: boolean;
  parks: Park[];
  initialValues: string[];
  selectedParks?: string[];
  selectedDropdownItem: string;
  handleOnChange: (values: string[]) => void;
  handleSubmit: (values: string[]) => void;
  saveFormRes?: ResponseKey;
};
