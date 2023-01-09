import { Parks } from "types";
import { ParkDesignationType } from 'types'

// load state from sessionStorage
export const loadState = (selectedItemKey: ParkDesignationType) => {
  try {
    const storageState = sessionStorage.getItem(selectedItemKey)
    return JSON.parse(storageState || "[]")
  } catch (err) {
    return undefined;
  }
};

// save state to sessionStorage
export const saveState = (selectedItemKey: ParkDesignationType, parks: Parks[]) => {
  try {
    const serializedState = JSON.stringify(parks);
    sessionStorage.setItem(selectedItemKey, serializedState);
  } catch (err) {
    return undefined;
  }
};
