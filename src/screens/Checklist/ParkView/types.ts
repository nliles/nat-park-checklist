import { Dispatch, SetStateAction } from "react";
import { Response, Park } from "types";

export type ParkViewProps = {
  handleListItemChange: (item: string) => void;
  loading?: boolean;
  parks: Park[];
  initialValues: string[];
  selectedParks?: string[];
  selectedDropdownItem: string;
  handleOnChange: (values: string[]) => void;
  handleSubmit: (values: string[]) => void;
  saveFormRes?: string;
  setSaveFormRes: Dispatch<SetStateAction<Response | undefined>>;
};
