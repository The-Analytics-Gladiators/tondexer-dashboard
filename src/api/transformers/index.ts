import dayjs from 'dayjs';
import {
  ArbitrageDetails,
  ArbitrageDetailsDto,
  ArbitrageVolumeHistory,
  ArbitrageVolumeHistoryDto,
  Swap,
  SwapDto,
  VolumeHistory,
  VolumeHistoryDto,
} from '../types';
import { DATA_PERIOD } from '../index.ts';
import { countFormatter } from '../../components/Charts/utils.ts';

export const transformVolumeHistoryDtoToVolumeHistory = (
  dto: VolumeHistoryDto[],
  dataperiod: DATA_PERIOD
): VolumeHistory[] => {
  const formatTemplate = getFormatTemplate(dataperiod);
  return dto.map((item) => ({
    period: item.period,
    stonfiVolume: item.stonfi_volume,
    dedustVolume: item.dedust_volume,
    number: item.number,
    name: dayjs(item.period).format(formatTemplate),
  }));
};

export const transformArbitrageVolumeHistoryDtoToArbitrageVolumeHistory = (
  dto: ArbitrageVolumeHistoryDto[],
  dataperiod: DATA_PERIOD
): ArbitrageVolumeHistory[] => {
  const formatTemplate = getFormatTemplate(dataperiod);
  return dto.map((item) => ({
    period: item.period,
    usdProfit: item.usd_profit,
    usdVolume: item.usd_profit,
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

export const transformArbitrageDetailsDtoToArbitrageDetails = (
  dtos: ArbitrageDetailsDto[]
): ArbitrageDetails[] =>
  dtos.map((dto) => {
    const jettonArbitrage = dto.amounts_jettons.map(
      (amount, index) =>
        `${countFormatter(dto.jettons_decimals[index]).format(amount)} ${dto.jetton_symbols[index]}`
    );

    return {
      time: dto.time,
      sender: dto.sender,
      traces: dto.traces,
      amountIn: dto.amount_in,
      amountInJettons: dto.amount_in_jettons,
      amountOut: dto.amount_out,
      amountOutJettons: dto.amount_out_jettons,
      amountInUsd: dto.amount_in_usd,
      amountOutUsd: dto.amount_out_usd,
      jetton: dto.jetton,
      jettonSymbol: dto.jetton_symbol,
      jettonName: dto.jetton_name,
      jettonUsdRate: dto.jetton_usd_rate,
      jettonDecimals: dto.jetton_decimals,
      amountsPath: dto.amounts_path,
      jettonsPath: dto.jettons_path,
      jettonNames: dto.jetton_names,
      jettonSymbols: dto.jetton_symbols,
      jettonUsdRates: dto.jetton_usd_rates,
      jettonsDecimals: dto.jettons_decimals,
      amountsJettons: dto.amounts_jettons,
      amountsUsdPath: dto.amounts_usd_path,
      poolsPath: dto.pools_path,
      dexes: dto.dexes,
      usdProfit: dto.amount_out_usd - dto.amount_in_usd,
      jettonArbitrage,
      shortUserHash:
        dto.sender.length <= 8
          ? dto.sender
          : `${dto.sender.slice(0, 4)}...${dto.sender.slice(-4)}`,
    };
  });
