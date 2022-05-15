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
export const saveState = (selected: string[]) => {
  try {
    const serializedState = JSON.stringify(selected);
    sessionStorage.setItem("selected", serializedState);
  } catch {}
};
