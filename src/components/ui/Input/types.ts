import { RegisterOptions } from "react-hook-form";

export type InputProps = {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  formError?: string;
  rules?: RegisterOptions;
};
