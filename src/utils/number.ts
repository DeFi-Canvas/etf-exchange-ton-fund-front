export const formatNumberToUI = (val: number) =>
    val.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export const formatNumberExponent = (x: number) => {
    const exp = x.toExponential();
    const bufferNumber = x.toFixed(2);

    const isMoreThrnThero =
        (!!Number(bufferNumber.split('.')[0]) &&
            bufferNumber.split('.').length > 1) ||
        bufferNumber === '0.00';

    console.log(x, bufferNumber);

    if (isMoreThrnThero) return bufferNumber;

    const floatPart = exp.split('e')[0].split('.').join('');
    const thero = new Array(9 - floatPart.split('').length).fill('0').join('');
    return `0.${thero}...${floatPart}`;
};
