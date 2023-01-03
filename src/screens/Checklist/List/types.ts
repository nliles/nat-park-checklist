import { Dispatch, SetStateAction } from "react";
import { Response } from "types";
import { Park } from "types";

export type ListProps = {
  parks: Park[];
  selectedDropdownItem: string;
  initialParkValues: string[];
  handleOnChange: (values: string[]) => void;
  handleOnSubmit: (values: string[]) => void;
  saveFormRes?: string;
  setSaveFormRes: Dispatch<React.SetStateAction<Response | undefined>>;
};
