export const calculatePercentage = (dividend: number, divisor: number) => {
  const percentage = parseFloat(((dividend * 100) / divisor).toFixed(2))

  return percentage
}
