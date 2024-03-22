const ALL_DESIGNATION_KEY = "allDesignations";

// load state from sessionStorage
export const loadState = (itemKey?: string) => {
  try {
    const storageState = sessionStorage.getItem(itemKey || ALL_DESIGNATION_KEY);
    return JSON.parse(storageState || "[]");
  } catch (err) {
    return undefined;
  }
};

// save state to sessionStorage
export const saveState = (itemValue: string, itemKey?: string) => {
  try {
    sessionStorage.setItem(itemKey || ALL_DESIGNATION_KEY, itemValue);
  } catch (err) {
    return undefined;
  }
};
