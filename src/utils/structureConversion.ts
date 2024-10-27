export const getObjectOutOfAnArray = (array: string[]) =>
  array.map((elem) => ({ label: elem, value: elem }));
