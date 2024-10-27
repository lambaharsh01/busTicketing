type returnValue = { value: string; label: string };

const converArrayIntoSearchStream = (array: string[]): returnValue[] =>
  array.map((elem: string) => ({ value: elem, label: elem }));

export default converArrayIntoSearchStream;
