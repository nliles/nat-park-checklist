import { ButtonTypeValue } from "components/ui/Button/enum";

export type ButtonProps = {
  txt: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: ButtonTypeValue;
  sizeSm?: boolean;
  styleName?: string;
};
