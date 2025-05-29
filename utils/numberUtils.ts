export const currencyFormatter = (amount: number) => {
  return amount.toLocaleString('de-DE', { minimumFractionDigits: 2 });
};
