import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";
import { ResponseKey } from "enum/Response";

export type ParkViewProps = {
  handleListItemChange: (item: string) => void;
  loading?: boolean;
  parks: Park[];
  initialValues: string[];
  selectedParks?: string[];
  selectedDropdownItem: ParkDesignationType;
  handleOnChange: (value: string, checked: boolean) => void;
  handleSubmit: (hideSaveFormRes?: boolean) => void;
  saveFormRes?: ResponseKey;
};
