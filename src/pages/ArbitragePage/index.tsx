import { useEffect, useMemo, useState } from 'react';
import {
  SwapDistributionBarEntry,
  arbitragesDistributionToDataArray,
} from '../../api/swaps';
import Grid from '@mui/material/Grid2';
import { Props as BarComponentProps } from 'recharts/types/cartesian/Bar';
import { Props as LineComponentProps } from 'recharts/types/cartesian/Line';
import UserStatsTable from '../../components/UserStatsTable';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import {
  DATA_PERIOD,
  fetchArbitragesDistribution,
  fetchArbitrageVolumeHistory,
  fetchLatestArbitrages,
  fetchTopArbitrageJettons,
  fetchTopArbitrages,
  fetchTopArbitrageUsers,
} from '../../api';
import {
  ArbitrageDetails,
  ArbitrageJetton,
  ArbitragesDistribution,
  ArbitrageVolumeHistory,
  emptyArbitragesDistibution,
  UserStatsDto,
} from '../../api/types';
import ComposedBarLineChart from '../../components/Charts/ComposedBarLine';
import ChartCustomContainer from '../../components/ChartContainer';
import ArbitragesTable from '../../components/ArbitragesTable';
import { Link } from 'react-router-dom';
import { REFRESH_INTERVAL_MS } from '../../components/Charts/utils.ts';
import { CircularProgress } from '@mui/material';

const ArbitragePage = () => {
  const [selectedDataPeriod, setSelectedDataPeriod] = useState<DATA_PERIOD>(
    DATA_PERIOD.DAY
  );
  const [latestArbitrages, setLatestArbitrages] = useState<ArbitrageDetails[]>(
    []
  );
  const [isLatestArbitragesLoading, setIsLatestArbitragesLoading] =
    useState<boolean>(true);
  const [arbVolumeHistory, setArbVolumeHistory] = useState<
    ArbitrageVolumeHistory[]
  >([]);
  const [isArbVolumeHistoryLoading, setIsArbVolumeHistoryLoading] =
    useState<boolean>(true);
  const [isTopArbitragesLoading, setIsTopArbitragesLoading] =
    useState<boolean>(true);
  const [topArbitrages, setTopArbitrages] = useState<ArbitrageDetails[]>([]);
  const [arbitrageJettons, setArbitrageJettons] = useState<ArbitrageJetton[]>(
    []
  );
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [isTopArbitrageUsersLoading, setIsTopArbitrageUsersLoading] =
    useState<boolean>(true);
  const [topArbitrageUsers, setTopArbitrageUsers] = useState<UserStatsDto[]>(
    []
  );
  const [arbitragesDistribution, setArbitragesDistribution] =
    useState<ArbitragesDistribution>(emptyArbitragesDistibution);
  const [isReloadInProgress, setIsReloadInProgress] = useState(false);

  const arbitragesDistributionChartBarConfig: BarComponentProps[] = useMemo(
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

  const composedChartBarsConfig: BarComponentProps[] = useMemo(
    () => [
      {
        name: 'Profit',
        dataKey: 'usdProfit',
        fill: '#413ea0',
        yAxisId: 'left',
        stackId: 'a',
        display: 'usdProfitFormatted',
        barSize: 20,
      },
    ],
    []
  );
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

  const composedChartJettonsBarsConfig: BarComponentProps[] = useMemo(
    () => [
      {
        name: 'Arbitrages Profit',
        dataKey: 'profitUsd',
        fill: '#413ea0',
        yAxisId: 'left',
        stackId: 'a',
        display: 'usdProfitFormatted',
        barSize: 20,
      },
    ],
    []
  );

  const composedChartJettonsLinesConfig: LineComponentProps[] = useMemo(
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

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount((prevCount) => prevCount + 1);
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (refreshCount < 1) {
      setIsArbVolumeHistoryLoading(true);
      setIsLatestArbitragesLoading(true);
      setIsTopArbitragesLoading(true);
      setIsTopArbitragesLoading(true);
      setIsTopArbitrageUsersLoading(true);
    } else {
      setIsReloadInProgress(true);
    }

    fetchArbitrageVolumeHistory(selectedDataPeriod)
      .then((data) => {
        setArbVolumeHistory(data);
        setIsArbVolumeHistoryLoading(false);
        setIsReloadInProgress(false);
      })
      .catch(() => {
        setIsArbVolumeHistoryLoading(false);
      });
    fetchLatestArbitrages(selectedDataPeriod)
      .then((data) => {
        setLatestArbitrages(data);
        setIsLatestArbitragesLoading(false);
      })
      .catch(() => {
        setIsLatestArbitragesLoading(false);
      });
    fetchTopArbitrages(selectedDataPeriod).then((data) => {
      setTopArbitrages(data);
      setIsTopArbitragesLoading(false);
    });
    fetchArbitragesDistribution(selectedDataPeriod).then((data) => {
      setArbitragesDistribution(data);
    });
    fetchTopArbitrageJettons(selectedDataPeriod).then((data) => {
      setArbitrageJettons(data);
    });
    fetchTopArbitrageUsers(selectedDataPeriod).then((data) => {
      setTopArbitrageUsers(data);
      setIsTopArbitrageUsersLoading(false);
    });
  }, [selectedDataPeriod, refreshCount]);

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
          <Link to="/">
            <Typography component="h2" variant="h6" sx={{ mb: 2, mr: 2 }}>
              Market Overview
            </Typography>
          </Link>
          <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
            Arbitrages Overview
          </Typography>
        </Grid>
        <Grid container direction="row">
          {isReloadInProgress && (
            <CircularProgress sx={{ marginRight: '30px' }} color="primary" />
          )}
          <ToggleButtonGroup
            color="primary"
            value={selectedDataPeriod}
            exclusive
            onChange={(_, value: DATA_PERIOD) => setSelectedDataPeriod(value)}
            aria-label="Platform"
          >
            <ToggleButton value={DATA_PERIOD.DAY}>Day</ToggleButton>
            <ToggleButton value={DATA_PERIOD.WEEK}>Week</ToggleButton>
            <ToggleButton value={DATA_PERIOD.MONTH}>Month</ToggleButton>
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
          isLoading={isArbVolumeHistoryLoading}
          title="Arbitrage Volume & Transactions"
        >
          <ComposedBarLineChart<ArbitrageVolumeHistory>
            data={arbVolumeHistory}
            bars={composedChartBarsConfig}
            lines={composedChartLinesConfig}
            xAxisDataKey="name"
            legend={true}
          />
        </ChartCustomContainer>
        <ChartCustomContainer
          title="Latest Arbitrage Opportunities"
          isLoading={isLatestArbitragesLoading}
        >
          <ArbitragesTable data={latestArbitrages} />
        </ChartCustomContainer>
        <ChartCustomContainer
          isLoading={isTopArbitragesLoading}
          size={{ lg: 6 }}
          title="Top Arbitrage Profits"
        >
          <ArbitragesTable data={topArbitrages} />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ lg: 6 }}
          isLoading={false}
          title="Profit Distribution for Arbitrage Trades"
          description="A chart showing how arbitrage profits are distributed across different ranges, providing insights into the profitability of trades."
        >
          <ComposedBarLineChart<SwapDistributionBarEntry>
            data={arbitragesDistributionToDataArray(arbitragesDistribution)}
            bars={arbitragesDistributionChartBarConfig}
            lines={[]}
            xAxisDataKey="label"
            legend={false}
          />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ lg: 6 }}
          isLoading={false}
          title="Top Jettons for Arbitrage"
        >
          <ComposedBarLineChart<ArbitrageJetton>
            data={arbitrageJettons}
            bars={composedChartJettonsBarsConfig}
            lines={composedChartJettonsLinesConfig}
            xAxisDataKey="jettonSymbol"
            legend
          />
        </ChartCustomContainer>
        <ChartCustomContainer
          size={{ lg: 6 }}
          isLoading={isTopArbitrageUsersLoading}
          title="Leading Arbitrage Traders"
        >
          <UserStatsTable data={topArbitrageUsers} />
        </ChartCustomContainer>
      </Grid>
    </Box>
  );
};

export default ArbitragePage;
