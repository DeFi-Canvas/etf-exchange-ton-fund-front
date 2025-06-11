export const formatNumberToUI = (val: number) =>
    val.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

export function formatNumberExponent(num: number): string {
    const isExponentView = num.toString().includes('e');
    if (isExponentView) {
        const float = num.toString().split('e')[0].split('.').join('');
        return `0.00...${float}`;
    }
    if (
        num > 0 &&
        num < 1 &&
        num.toString().split('.')[1].split('').length > 5
    ) {
        const float = num
            .toString()
            .split('.')[1]
            .split('')
            .filter((num) => num !== '0')
            .join('');
        return `0.00...${float}`;
    }

    if (
        num
            .toString()
            ?.split('.')[1]
            ?.split('')
            ?.filter((num) => num !== '0')?.length > 0
    ) {
        return num.toString();
    }
    return num.toFixed(2).toString();
}
