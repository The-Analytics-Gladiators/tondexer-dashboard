export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export const countFormatter = (fractionDigits = 0) =>
  new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: fractionDigits || 0,
    maximumFractionDigits: fractionDigits,
  });

const MONEY_FIELDS = new Set(['usdProfit', 'usdVolume', 'inUsd', 'outUsd']);

export const isMoneyField = (fieldName: string): boolean => {
  return MONEY_FIELDS.has(fieldName);
};
