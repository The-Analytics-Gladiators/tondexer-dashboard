export type VolumeHistoryDto = {
  period: string;
  stonfi_volume: number;
  dedust_volume: number;
  number: number;
};

export type VolumeHistory = {
  period: string;
  stonfiVolume: number;
  dedustVolume: number;
  number: number;
  name: string;
};

export type SummaryDto = {
  volume: number;
  number: number;
  unique_tokens: number;
  unique_users: number;
};

export type SwapDto = {
  Time: string;
  Dex: string;
  Hashes: string[];
  Sender: string;
  JettonInMaster: string;
  JettonInSymbol: string;
  JettonInName: string;
  JettonInUsdRate: number;
  JettonInDecimals: number;
  AmountIn: number;
  InUsd: number;
  JettonOut: string;
  JettonOutSymbol: string;
  JettonOutName: string;
  JettonOutUsdRate: number;
  JettonOutDecimals: number;
  AmountOut: number;
  OutUsd: number;
  MinAmountOut: number;
  ReferralAddress: string;
  ReferralAmount: number;
  ReferralUsd: number;
  PoolAddress: string;
};

export type Swap = {
  time: string;
  dex: string;
  hashes: string[];
  sender: string;
  jettonInMaster: string;
  jettonInSymbol: string;
  jettonInName: string;
  jettonInUsdRate: number;
  jettonInDecimals: number;
  amountIn: number;
  inUsd: number;
  jettonOut: string;
  jettonOutSymbol: string;
  jettonOutName: string;
  jettonOutUsdRate: number;
  jettonOutDecimals: number;
  amountOut: number;
  outUsd: number;
  minAmountOut: number;
  referralAddress: string;
  referralAmount: number;
  referralUsd: number;
  poolAddress: string;
};

export type UserStatsDto = {
  user_address: string;
  amount_usd: number;
  tokens: number;
  count: number;
};

export type ArbitrageVolumeHistoryDto = {
  period: string;
  usd_profit: number;
  usd_volume: number;
  number: number;
};

export type ArbitrageVolumeHistory = {
  period: string;
  usdProfit: number;
  usdVolume: number;
  number: number;
  name: string;
};

export type ArbitrageDetailsDto = {
  time: string;
  sender: string;
  traces: string[];
  amount_in: number;
  amount_in_jettons: number;
  amount_out: number;
  amount_out_jettons: number;
  amount_in_usd: number;
  amount_out_usd: number;
  jetton: string;
  jetton_symbol: string;
  jetton_name: string;
  jetton_usd_rate: number;
  jetton_decimals: number;
  amounts_path: number[];
  jettons_path: string[];
  jetton_names: string[];
  jetton_symbols: string[];
  jetton_usd_rates: number[];
  jettons_decimals: number[];
  amounts_jettons: number[];
  amounts_usd_path: number[];
  pools_path: string[];
  dexes: string[];
};

export type ArbitrageDetails = {
  time: string;
  sender: string;
  traces: string[];
  amountIn: number;
  amountInJettons: number;
  amountOut: number;
  amountOutJettons: number;
  amountInUsd: number;
  amountOutUsd: number;
  jetton: string;
  jettonSymbol: string;
  jettonName: string;
  jettonUsdRate: number;
  jettonDecimals: number;
  amountsPath: number[];
  jettonsPath: string[];
  jettonNames: string[];
  jettonSymbols: string[];
  jettonUsdRates: number[];
  jettonsDecimals: number[];
  amountsJettons: number[];
  amountsUsdPath: number[];
  poolsPath: string[];
  dexes: string[];
  jettonArbitrage: string[];
  usdProfit: number;
  shortUserHash: string;
};

export type SwapsDistributionDto = {
  usd_1: number;
  usd_1_5: number;
  usd_5_15: number;
  usd_15_50: number;
  usd_50_150: number;
  usd_150_500: number;
  usd_500_2000: number;
  usd_2000: number;
}

export type SwapsDistribution = {
  usdRangeTo1: number;
  usdRange1To5: number;
  usdRange5To15: number;
  usdRange15To50: number;
  usdRange50To150: number;
  usdRange150To500: number;
  usdRange500To2000: number;
  usdRangeFrom2000: number;
}

export const emptySwapsDistribution = {
  usdRangeTo1: 0,
  usdRange1To5: 0,
  usdRange5To15: 0,
  usdRange15To50: 0,
  usdRange50To150: 0,
  usdRange150To500: 0,
  usdRange500To2000: 0,
  usdRangeFrom2000: 0,
}

export type TopPoolDto = {
  pool_address: string,
  jetton_in_symbol: string,
  jetton_out_symbol: string,
  amount_usd: number,
  dex: string,
}

export type TopPool = {
  poolAddress: string,
  jettonInSymbol: string,
  jettonOutSymbol: string,
  amountUsd: number,
  dex: string,
}

export type TopJettonDto = {
  jetton_address: string,
  jetton_symbol: string,
  jetton_usd: number,
}

export type TopJetton = {
  jettonAddress: string,
  jettonSymbol: string,
  jettonUsd: number,
}

export type TopUserDto = {
  user_address: string,
  amount_usd: number,
}

export type TopUser = {
  userAddress: string,
  shortUserAddress: string,
  amountUsd: number,
}

export type ArbitragesDistributionDto = {
  usd_1: number;
  usd_5_20: number;
  usd_20_50: number;
  usd_50_200: number;
  usd_200_500: number;
  usd_500_1000: number;
  usd_1000_5000: number;
  usd_5000: number;
}

export type ArbitragesDistribution = {
  usdRangeTo5: number;
  usdRange5To20: number;
  usdRange20To50: number;
  usdRange50To200: number;
  usdRange200To500: number;
  usdRange500To1000: number;
  usdRange1000To5000: number;
  usdRangeFrom5000: number;
}

export const emptyArbitragesDistibution: ArbitragesDistribution = {
  usdRangeTo5: 0,
  usdRange5To20: 0,
  usdRange20To50: 0,
  usdRange50To200: 0,
  usdRange200To500: 0,
  usdRange500To1000: 0,
  usdRange1000To5000: 0,
  usdRangeFrom5000: 0,
}

export type ArbitrageJettonDto = {
  jetton: string;
  jetton_symbol: string;
  jetton_name: string;
  jetton_decimals: number;
  profit_usd: number;
  number: number;
}

export type ArbitrageJetton = {
  jetton: string;
  jettonSymbol: string;
  jettonName: string;
  jettonDecimals: number;
  profitUsd: number;
  number: number;
}
