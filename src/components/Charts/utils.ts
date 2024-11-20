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

export const formatJettonAmount = (amount: number, decimals: number) => {
  const jettonAmount = amount / Math.pow(10, decimals)

  const factionDigits = Math.max(0, 4 - Math.log10(Math.abs(jettonAmount)))

  const formatted = countFormatter(factionDigits).format(jettonAmount)
  if (jettonAmount > 100) {
    return formatted.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '') 
  } else {
    if (formatted.endsWith('00')) {
      return formatted.substring(0, formatted.length - 2)
    } else if(formatted.endsWith('.00')) {
      return formatted.substring(0, formatted.length - 3)
    } else {
      return formatted
    }
  }
}
