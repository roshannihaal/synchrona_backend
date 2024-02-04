export const calculatePercentage = (dividend: number, divisor: number) => {
  const percentage = Math.floor((dividend * 100) / divisor)
  return percentage
}
