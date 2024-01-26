const useLocalStorage = (key, value, isArray = false) => {
  if (typeof localStorage !== "undefined") {
    if (value || value === null || typeof value === "object") {
      if (isArray) {
        localStorage.setItem(key, JSON.stringify(value));
        return;
      }
      localStorage.setItem(key, value);
      return true;
    } else {
      const localData = localStorage.getItem(key);
      if (isArray) {
        if (localData === "") {
          return [];
        } else {
          return JSON.parse(localData);
        }
      }
      return localData;
    }
  }
};

export default useLocalStorage;
