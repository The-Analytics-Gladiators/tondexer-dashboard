const MONEY_FIELDS = new Set([
  'usdProfit',
  'usdVolume',
  'inUsd',
  'outUsd',
  'stonfiVolume',
  'dedustVolume',
  'profitUsd',
]);

export const CHART_HEIGHT = 240;
export const TABLE_HEIGHT = CHART_HEIGHT;

export const REFRESH_INTERVAL_MS = 5000;

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

export const isMoneyField = (fieldName: string): boolean => {
  return MONEY_FIELDS.has(fieldName);
};

export const formatJettonAmount = (amount: number, decimals: number) => {
  const jettonAmount = amount / Math.pow(10, decimals);

  const factionDigits =
    jettonAmount === 0
      ? 0
      : Math.max(0, 5 - Math.log10(Math.abs(jettonAmount)));

  const formatted = countFormatter(factionDigits).format(jettonAmount);

  var preFinal: string;
  if (jettonAmount > 1000) {
    preFinal = formatted
      .replace(/\.0+$/, '')
      .replace(/(\.\d*?)0+$/, '$1')
      .replace(/\.$/, '');
  } else {
    if (formatted.endsWith('00')) {
      preFinal = formatted.substring(0, formatted.length - 2);
    } else if (formatted.endsWith('.00')) {
      preFinal = formatted.substring(0, formatted.length - 3);
    } else {
      preFinal = formatted;
    }
  }
  return preFinal.endsWith('.')
    ? preFinal.substring(0, preFinal.length - 1)
    : preFinal;
};
