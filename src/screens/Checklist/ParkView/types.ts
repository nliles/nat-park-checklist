import { Park } from "types/park";
import { ParkDesignationType } from "enum/ParkDesignation";

export type ParkViewProps = {
  count: number;
  handleListItemChange: (item: string) => void;
  loading?: boolean;
  parks: Park[];
  initialValues: string[];
  selectedParks?: string[];
  selectedDropdownItem: ParkDesignationType;
  handleOnSubmit: (values: string[]) => void;
};
