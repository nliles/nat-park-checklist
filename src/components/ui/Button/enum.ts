export enum ButtonType {
	BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset'
}

export type ButtonTypeKey = keyof typeof ButtonType;
export type ButtonTypeValue = typeof ButtonType[ButtonTypeKey];
