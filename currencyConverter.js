export function convertCurrency(amount, fromRate, toRate) {
  const usdAmount = amount / fromRate;
  const convertedAmount = usdAmount * toRate;
  return convertedAmount;
}