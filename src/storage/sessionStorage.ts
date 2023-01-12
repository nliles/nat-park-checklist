// load state from sessionStorage
export const loadState = (itemKey: string) => {
  try {
    const storageState = sessionStorage.getItem(itemKey);
    return JSON.parse(storageState || "[]");
  } catch (err) {
    return undefined;
  }
};

// save state to sessionStorage
export const saveState = (itemKey: string, itemValue: string) => {
  try {
    sessionStorage.setItem(itemKey, itemValue);
  } catch (err) {
    return undefined;
  }
};
