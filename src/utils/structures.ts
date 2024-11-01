import { structureGetObjectOutOfAnArrayInterface, structureGetStringSizeReturnInterface } from "../constants/interfaces";

export const getObjectOutOfAnArray = (
  array: string[]
): structureGetObjectOutOfAnArrayInterface[] => {
  return array.map((elem) => ({ label: elem, value: elem }));
};

export const toFixedValue = (float: number): number => Number(float.toFixed(2));

export const findDiscountedAmount = (
  total: number,
  percentage: number
): number => {
  const discountAmount: number = (percentage / 100) * total;
  const finalAmount: number = total - discountAmount;
  return Number(finalAmount.toFixed(2));
};


export const getStringSize = (parameter: any[]): structureGetStringSizeReturnInterface=>{

  const stringedParameter: string= JSON.stringify(parameter);
  const bytes = stringedParameter.length * 2; // Each character is 2 bytes
  const kilobytes = bytes / 1024;
  const megabytes = kilobytes / 1024;

  return {
    bytes,
    kb: Number(kilobytes.toFixed(2)),
    mb: Number(megabytes.toFixed(5)),
    parsed: parameter,
    stringified: stringedParameter,
  };

}