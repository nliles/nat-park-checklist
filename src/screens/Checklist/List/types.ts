import React, { Dispatch } from "react";
import { Park } from "types";

export type ListType = {
  parks: Park[];
  selectedDropdownItem: string;
  initialParkValues: string[];
  handleOnChange: (values: string[]) => void;
  handleOnSubmit: (values: string[]) => void;
  saveFormRes?: string;
  setSaveFormRes: Dispatch<React.SetStateAction<Response | undefined>>;
};
