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
