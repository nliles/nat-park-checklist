import { Parks } from "types";

// load state from local storage
export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("selected");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// save state to local storage
export const saveState = (selected: Parks) => {
  const data = loadState();
  const parks = {
    ...(data || {}),
    ...selected,
  };
  try {
    const serializedState = JSON.stringify(parks);
    sessionStorage.setItem("selected", serializedState);
  } catch {}
};
