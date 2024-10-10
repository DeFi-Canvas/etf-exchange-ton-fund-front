export const calcIsError = ({currentValue, maxValue ,minValue}: {currentValue: number, maxValue: number, minValue: number}) => {
  return currentValue < minValue || currentValue > maxValue
}