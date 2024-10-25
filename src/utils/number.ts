export const formatNumberToUI = (val: number) =>
    val.toLocaleString('en-US', { minimumFractionDigits: 2 });
