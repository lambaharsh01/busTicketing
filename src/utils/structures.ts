interface getObjectOutOfAnArrayInterface {
  label: string;
  value: string;
}

export const getObjectOutOfAnArray = (
  array: string[]
): getObjectOutOfAnArrayInterface[] => {
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
