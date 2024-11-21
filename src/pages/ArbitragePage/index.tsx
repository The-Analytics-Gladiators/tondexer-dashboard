import { useEffect, useMemo, useState } from 'react';
import { SwapDistributionBarEntry, arbitragesDistributionToDataArray } from '../../api/swaps';
import Grid from '@mui/material/Grid2';
import { Props as BarComponentProps } from 'recharts/types/cartesian/Bar';
import { Props as LineComponentProps } from 'recharts/types/cartesian/Line';
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
} from '../../api';
import { ArbitrageDetails, ArbitrageJetton, ArbitragesDistribution, ArbitrageVolumeHistory, emptyArbitragesDistibution } from '../../api/types';
import ComposedBarLineChart from '../../components/Charts/ComposedBarLine';
import ChartCustomContainer from '../../components/ChartContainer';
import ArbitragesTable from '../../components/ArbitragesTable';
import { Link } from 'react-router-dom';

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

  const [isTopArbitragesLoading, setIsTopArbitragesLoading] = useState<boolean>(true);
  const [topArbitrages, setTopArbitrages] = useState<ArbitrageDetails[]>([])

  const [arbitrageJettons, setArbitrageJettons] = useState<ArbitrageJetton[]>([]);

  const [arbitragesDistribution, setArbitragesDistribution] = useState<ArbitragesDistribution>(emptyArbitragesDistibution);
  const arbitragesDistributionChartBarConfig: BarComponentProps[] = useMemo(
    () => [
      {
        dataKey: 'transactions',
        fill: '#413ea0',
        yAxisId: 'left',
        display: 'volumeFormatted',
      }
    ], []
  )

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
    ], []
  )

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
    setIsArbVolumeHistoryLoading(true);
    setIsLatestArbitragesLoading(true);
    setIsTopArbitragesLoading(true);
    // setIsArbitragesDistributionLoading(true);
    fetchArbitrageVolumeHistory(selectedDataPeriod)
      .then((data) => {
        setArbVolumeHistory(data);
        setIsArbVolumeHistoryLoading(false);
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
    fetchTopArbitrages(selectedDataPeriod)
      .then((data) => {
        setTopArbitrages(data);
        setIsTopArbitragesLoading(false);
      })
    fetchArbitragesDistribution(selectedDataPeriod)
      .then((data) => {
        setArbitragesDistribution(data);
      })
    fetchTopArbitrageJettons(selectedDataPeriod)
      .then((data) => {
        setArbitrageJettons(data);
      })
  }, [selectedDataPeriod]);

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
          sx={{ minHeight: '350px' }}
          isLoading={isArbVolumeHistoryLoading}
        >
          <ComposedBarLineChart<ArbitrageVolumeHistory>
            data={arbVolumeHistory}
            bars={composedChartBarsConfig}
            lines={composedChartLinesConfig}
            xAxisDataKey="name"
            legend={true}
          />
        </ChartCustomContainer>
        <ChartCustomContainer isLoading={isLatestArbitragesLoading}>
          <ArbitragesTable data={latestArbitrages} />
        </ChartCustomContainer>
        <ChartCustomContainer 
          isLoading={isTopArbitragesLoading}
          size={{ lg: 6 }}
        >
          <ArbitragesTable data={topArbitrages} />
        </ChartCustomContainer>
        <ChartCustomContainer 
          sx={{ minHeight: '300px' }}
          size={{ lg: 3 }}
          isLoading={false}
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
          sx={{ minHeight: '400px' }}
          size={{ lg: 3 }}
          isLoading={false}
        >
          <ComposedBarLineChart<ArbitrageJetton>
            data={arbitrageJettons}
            bars={composedChartJettonsBarsConfig}
            lines={composedChartJettonsLinesConfig}
            xAxisDataKey="jettonSymbol"
            legend
          />
        </ChartCustomContainer>
      </Grid>
    </Box>
  );
};

export default ArbitragePage;
