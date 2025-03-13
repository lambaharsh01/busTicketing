import { userFiltrationStructure } from "../constants/interfaces";

type returnValue = { value: string; label: string };

export const converArrayIntoSearchStream = (array: string[]): returnValue[] =>
  array.map((elem: string) => ({ value: elem, label: elem }));

export const convertUserArrayIntoSearchStream = (array: userFiltrationStructure[]): returnValue[] =>
  array.map((elem: userFiltrationStructure) => ({ value: elem.userEmail, label: elem.userEmail }));

