export const pushInLocalStorage = (key, value) => {
  const valueInString = JSON.stringify(value);
  localStorage.setItem(key, valueInString);
};

export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  const valueInObject = JSON.parse(value);
  return valueInObject;
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};
