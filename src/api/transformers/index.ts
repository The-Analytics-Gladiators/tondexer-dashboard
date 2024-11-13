import dayjs from 'dayjs';
import { Swap, SwapDto, VolumeHistory, VolumeHistoryDto } from '../types';
import { DATA_PERIOD } from '../index.ts';

export const transformVolumeHistoryDtoToVolumeHistory = (
  dto: VolumeHistoryDto[],
  dataperiod: DATA_PERIOD
): VolumeHistory[] => {
  const formatTemplate = getFormatTemplate(dataperiod);
  return dto.map((item) => ({
    period: item.period,
    stonfi_volume: item.stonfi_volume,
    dedust_volume: item.dedust_volume,
    number: item.number,
    name: dayjs(item.period).format(formatTemplate),
  }));
};

export const transformSwapDtoToSwap = (dto: SwapDto[]): Swap[] => {
  return dto.map((item) => ({
    time: item.Time,
    dex: item.Dex,
    hashes: item.Hashes,
    sender: item.Sender,
    jettonInMaster: item.JettonInMaster,
    jettonInSymbol: item.JettonInSymbol,
    jettonInName: item.JettonInName,
    jettonInUsdRate: item.JettonInUsdRate,
    jettonInDecimals: item.JettonInDecimals,
    amountIn: item.AmountIn,
    inUsd: item.InUsd,
    jettonOut: item.JettonOut,
    jettonOutSymbol: item.JettonOutSymbol,
    jettonOutName: item.JettonOutName,
    jettonOutUsdRate: item.JettonOutUsdRate,
    jettonOutDecimals: item.JettonOutDecimals,
    amountOut: item.AmountOut,
    outUsd: item.OutUsd,
    minAmountOut: item.MinAmountOut,
    referralAddress: item.ReferralAddress,
    referralAmount: item.ReferralAmount,
    referralUsd: item.ReferralUsd,
  }));
};

const getFormatTemplate = (dataperiod: DATA_PERIOD) => {
  switch (dataperiod) {
    case DATA_PERIOD.MONTH:
      return 'MMM DD';
    case DATA_PERIOD.WEEK:
      return 'MMM DD';
    case DATA_PERIOD.DAY:
      return 'MMM DD, HH:mm';
  }
};
