export const getKeyByValue = (obj: any, value: any) => {
  return Object.keys(obj).find((k) => obj[k] === value);
};
