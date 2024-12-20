import Box from '@mui/material/Box';
import { useEffect, useMemo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Props as BarComponentProps } from 'recharts/types/cartesian/Bar';
import { Props as LineComponentProps } from 'recharts/types/cartesian/Line';
import ToggleButton from '@mui/material/ToggleButton';
import ComposedBarLineChart from '../../components/Charts/ComposedBarLine';
import {
  DATA_PERIOD,
  DEX_MARKET,
  fetchLatestSwaps,
  fetchSummary,
  fetchSwapsDistribution,
  fetchTopJettons,
  fetchTopPools,
  fetchTopReferrers,
  fetchVolumeHistory,
  fetchTopUsers,
  fetchTopSwaps,
} from '../../api';
import {
  emptySwapsDistribution,
  SummaryDto,
  Swap,
  SwapsDistribution,
  TopJetton,
  TopPool,
  TopUser,
  UserStatsDto,
  VolumeHistory,
} from '../../api/types';
import ChartCustomContainer from '../../components/ChartContainer';
import SwapsTable from '../../components/SwapsTable';
import SummaryDisplay from '../../components/Summary';
import UserStatsTable from '../../components/UserStatsTable';
import { Link } from 'react-router-dom';
import {
  SwapDistributionBarEntry,
  swapsDistributionToDataArray,
} from '../../api/swaps';
import CustomTreemap from '../../components/Charts/Treemap';
import {
  topJettonsToTreemapData,
  topPoolsToTreemapData,
  topUsersToTreemapData,
} from '../../components/Charts/Treemap/transformers';
import { REFRESH_INTERVAL_MS } from '../../components/Charts/utils.ts';
import { CircularProgress } from '@mui/material';

const MainPage = () => {
  const [volumeHistory, setVolumeHistory] = useState<VolumeHistory[]>([]);

  const [swapsLatest, setSwapsLatest] = useState<Swap[]>([]);
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [isReloadInProgress, setIsReloadInProgress] = useState(false);
  const [isSwapsLatestLoading, setIsSwapsLatestLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount((prevCount) => prevCount + 1);
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const [summary, setSummary] = useState<SummaryDto>({
    volume: 0,
    number: 0,
    unique_tokens: 0,
    unique_users: 0,
  });
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(true);

  const [isTopSwapsLoading, setIsTopSwapsLoading] = useState<boolean>(true);
  const [topSwaps, setTopSwaps] = useState<Swap[]>([]);

  const [swapsDistribution, setSwapsDistribution] = useState<SwapsDistribution>(
    emptySwapsDistribution
  );

  const [topReferrers, setTopReferrers] = useState<UserStatsDto[]>([]);
  const [isTopReferrersLoading, setIsTopReferrersLoading] =
    useState<boolean>(true);

  const [topPools, setTopPools] = useState<TopPool[]>([]);
  const [isTopPoolsLoading, setIsTopPoolsLoading] = useState<boolean>(true);

  const [topJettons, setTopJettons] = useState<TopJetton[]>([]);
  const [isTopJettonsLoading, setIsTopJettonsLoading] = useState<boolean>(true);

  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [isTopUsersLoading, setIsTopUsersLoading] = useState<boolean>(true);

  const [selectedDataPeriod, setSelectedDataPeriod] = useState<DATA_PERIOD>(
    DATA_PERIOD.DAY
  );

  const [selectedDex, setSelectedDex] = useState<DEX_MARKET>(DEX_MARKET.ALL);

  const composedChartLinesConfig: LineComponentProps[] = useMemo(
    () => [
      {
        name: 'Number of transactions',
        dataKey: 'number',
        fill: '#ff7300',
        stroke: '#ff7300',
        yAxisId: 'right',
        type: 'monotone',
      },
    ],
    []
  );

  const composedChartBarsConfig: BarComponentProps[] = useMemo(
    () => [
      {
        name: 'Stonfi Volume',
        dataKey: 'stonfiVolume',
        fill: '#413ea0',
        yAxisId: 'left',
        stackId: 'a',
        display: 'volumeFormatted',
        barSize: 20,
      },
      {
        name: 'Dedust Volume',
        dataKey: 'dedustVolume',
        fill: '#cc9900',
        yAxisId: 'left',
        stackId: 'a',
        display: 'volumeFormatted',
        barSize: 20,
      },
    ],
    []
  );

  const swapsDistributionChartBarConfig: BarComponentProps[] = useMemo(
    () => [
      {
        dataKey: 'transactions',
        fill: '#413ea0',
        yAxisId: 'left',
        display: 'volumeFormatted',
      },
    ],
    []
  );

  useEffect(() => {
    if (refreshCount < 1) {
      setIsSwapsLatestLoading(true);
      setIsSummaryLoading(true);
      setIsTopSwapsLoading(true);
      setIsTopReferrersLoading(true);
      setIsTopPoolsLoading(true);
      setIsTopJettonsLoading(true);
      setIsTopUsersLoading(true);
    } else {
      setIsReloadInProgress(true);
    }

    fetchVolumeHistory(selectedDataPeriod, selectedDex).then((data) => {
      setVolumeHistory(data);
      setIsReloadInProgress(false);
    });
    fetchLatestSwaps(selectedDataPeriod, selectedDex).then((data) => {
      setSwapsLatest(data);
      setIsSwapsLatestLoading(false);
    });
    fetchSummary(selectedDataPeriod, selectedDex).then((data) => {
      setSummary(data);
      setIsSummaryLoading(false);
    });
    fetchTopSwaps(selectedDataPeriod, selectedDex).then((data) => {
      setTopSwaps(data);
      setIsTopSwapsLoading(false);
    });
    fetchSwapsDistribution(selectedDataPeriod, selectedDex).then((data) => {
      setSwapsDistribution(data);
    });
    fetchTopReferrers(selectedDataPeriod, selectedDex).then(({ data }) => {
      setTopReferrers(data);
      setIsTopReferrersLoading(false);
    });
    fetchTopPools(selectedDataPeriod, selectedDex).then((data) => {
      setTopPools(data);
      setIsTopPoolsLoading(false);
    });
    fetchTopJettons(selectedDataPeriod, selectedDex).then((data) => {
      setTopJettons(data);
      setIsTopJettonsLoading(false);
    });
    fetchTopUsers(selectedDataPeriod, selectedDex).then((data) => {
      setTopUsers(data);
      setIsTopUsersLoading(false);
    });
  }, [selectedDataPeriod, selectedDex, refreshCount]);

  return (
    <Box sx={{ p: 5, width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid
        container
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}
      >
        <Grid container direction="row">
          <Typography component="h2" variant="h6" sx={{ mb: 2, mr: 2 }}>
            Market Overview
          </Typography>
          <Link to="/arb">
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Arbitrages Overview
            </Typography>
          </Link>
        </Grid>
        <Grid container direction="row">
          {isReloadInProgress && (
            <CircularProgress sx={{ marginRight: '30px' }} color="primary" />
          )}
          <ToggleButtonGroup
            color="primary"
            value={selectedDataPeriod}
            exclusive
            sx={{ marginRight: 2 }}
            onChange={(_, value: DATA_PERIOD) => setSelectedDataPeriod(value)}
            aria-label="Period"
          >
            <ToggleButton value={DATA_PERIOD.DAY}>Day</ToggleButton>
            <ToggleButton value={DATA_PERIOD.WEEK}>Week</ToggleButton>
            <ToggleButton value={DATA_PERIOD.MONTH}>Month</ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            color="primary"
            value={selectedDex}
            exclusive
            onChange={(_, value: DEX_MARKET) => setSelectedDex(value)}
            aria-label="Platform"
          >
            <ToggleButton value={DEX_MARKET.ALL}>All Dex</ToggleButton>
            <ToggleButton value={DEX_MARKET.STONFI}>STON.fi</ToggleButton>
            <ToggleButton value={DEX_MARKET.DEDUST}>DeDust</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        spacing={2}
        columns={12}
        sx={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <ChartCustomContainer
          sx={{ minHeight: '140px' }}
          size={{ xs: 12 }}
          isLoading={isSummaryLoading}
        >
          <SummaryDisplay summary={summary} />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ lg: 7 }}
          isLoading={false}
          title="Volume and transactions"
        >
          <ComposedBarLineChart<VolumeHistory>
            data={volumeHistory}
            bars={composedChartBarsConfig}
            lines={composedChartLinesConfig}
            xAxisDataKey="name"
            legend
          />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ lg: 5 }}
          isLoading={isSwapsLatestLoading}
          title="Latest Transactions"
        >
          <SwapsTable data={swapsLatest} />
        </ChartCustomContainer>
        <ChartCustomContainer
          isLoading={isTopSwapsLoading}
          size={{ lg: 5 }}
          title="Top Transactions"
        >
          <SwapsTable data={topSwaps} />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ lg: 3 }}
          isLoading={false}
          title="Transactions Distribution"
          description="This chart shows how transaction volumes are distributed across different ranges, giving insights about sizes of typical trades."
        >
          <ComposedBarLineChart<SwapDistributionBarEntry>
            data={swapsDistributionToDataArray(swapsDistribution)}
            bars={swapsDistributionChartBarConfig}
            lines={[]}
            xAxisDataKey="label"
            legend={false}
          />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ lg: 4 }}
          isLoading={isTopReferrersLoading}
          title="Top Fee Earners"
          description="Users or wallets that have earned the most in fees by referring or facilitating trades on the DEX"
        >
          <UserStatsTable data={topReferrers} />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ xs: 12, lg: 4 }}
          isLoading={isTopPoolsLoading}
          title="Trending Liquidity Pools"
        >
          <CustomTreemap data={topPoolsToTreemapData(topPools)} />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ xs: 12, lg: 4 }}
          isLoading={isTopJettonsLoading}
          title="Trending Jettons"
        >
          <CustomTreemap data={topJettonsToTreemapData(topJettons)} />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ xs: 12, lg: 4 }}
          isLoading={isTopUsersLoading}
          title="Top Swappers by Volume"
        >
          <CustomTreemap data={topUsersToTreemapData(topUsers)} />
        </ChartCustomContainer>
      </Grid>
    </Box>
  );
};

export default MainPage;
