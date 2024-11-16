import axios from 'axios';
import {
  ArbitrageDetailsDto,
  ArbitrageVolumeHistoryDto,
  SummaryDto,
  SwapDto,
  UserStatsDto,
  VolumeHistoryDto,
} from './types';
import {
  transformArbitrageDetailsDtoToArbitrageDetails,
  transformArbitrageVolumeHistoryDtoToArbitrageVolumeHistory,
  transformSwapDtoToSwap,
  transformVolumeHistoryDtoToVolumeHistory,
} from './transformers';

const API_BASE_URL = 'https://tondexer.gladiators.dev/api';

export enum DATA_PERIOD {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export enum DEX_MARKET {
  ALL = 'all',
  STONFI = 'stonfi',
  DEDUST = 'dedust',
}

const tondexerApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSummary = (period: DATA_PERIOD, dex: DEX_MARKET) =>
  tondexerApiClient
    .get<SummaryDto>(`/summary`, { params: { period, dex } })
    .then(({ data }) => data);

export const fetchVolumeHistory = (period: DATA_PERIOD, dex: DEX_MARKET) =>
  tondexerApiClient
    .get<VolumeHistoryDto[]>(`/volumeHistory`, { params: { period, dex } })
    .then(({ data }) => transformVolumeHistoryDtoToVolumeHistory(data, period));

export const fetchLatestSwaps = (period: DATA_PERIOD, dex: DEX_MARKET) =>
  tondexerApiClient
    .get<SwapDto[]>(`/swaps/latest`, { params: { period, dex, limit: 5 } })
    .then(({ data }) => transformSwapDtoToSwap(data));

export const fetchTopProfiters = (period: DATA_PERIOD, dex: DEX_MARKET) =>
  tondexerApiClient.get<UserStatsDto[]>(`/profiters/top`, {
    params: { period, dex, limit: 5 },
  });

export const fetchTopReferrers = (period: DATA_PERIOD, dex: DEX_MARKET) =>
  tondexerApiClient.get<UserStatsDto[]>(`/referrers/top`, {
    params: { period, dex, limit: 5 },
  });

export const fetchArbitrageVolumeHistory = (period: DATA_PERIOD) =>
  tondexerApiClient
    .get<
      ArbitrageVolumeHistoryDto[]
    >(`/arbitrages/volumeHistory`, { params: { period } })
    .then(({ data }) =>
      transformArbitrageVolumeHistoryDtoToArbitrageVolumeHistory(data, period)
    );

export const fetchLatestArbitrages = (period: DATA_PERIOD) => {
  return tondexerApiClient
    .get<
      ArbitrageDetailsDto[]
    >(`/arbitrages/latest`, { params: { period, limit: 5 } })
    .then(({ data }) => transformArbitrageDetailsDtoToArbitrageDetails(data));
};

export const fetchLatestArbitrageSwaps = (period: DATA_PERIOD) => {
  return tondexerApiClient.get(`/arbitrages/latest`, {
    params: { period, limit: 5 },
  });
};

export const fetchTopSwaps = (period: DATA_PERIOD) =>
  tondexerApiClient.get(`/swaps/top`, { params: { period } });

export const fetchTopPools = (period: DATA_PERIOD) =>
  tondexerApiClient.get(`/pools/top`, { params: { period } });

export const fetchTopJettons = (period: DATA_PERIOD) =>
  tondexerApiClient.get(`/jettons/top`, { params: { period } });

export const fetchTopUsers = (period: DATA_PERIOD) =>
  tondexerApiClient.get(`/users/top`, { params: { period } });
