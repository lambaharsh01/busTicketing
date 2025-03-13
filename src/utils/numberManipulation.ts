export const formatNumberWithCommas = (num: number | undefined | null): string => {
    if(num===undefined || num === null) return ""

    return "₹" + num.toLocaleString("en-IN");
};