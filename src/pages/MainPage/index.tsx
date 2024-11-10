import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ComposedBarLineChart from '../../components/Charts/ComposedBarLine';
import {
  DATA_PERIOD,
  fetchLatestSwaps,
  fetchSummary,
  fetchTopProfiters,
  fetchTopReferrers,
  fetchVolumeHistory,
} from '../../api';
import { SummaryDto, Swap, UserStatsDto, VolumeHistory } from '../../api/types';
import ToggleButton from '@mui/material/ToggleButton';
import ChartCustomContainer from '../../components/ChartContainer';
import SwapsTable from '../../components/SwapsTable';
import SummaryDisplay from '../../components/Summary';
import UserStatsTable from '../../components/UserStatsTable';

const MainPage = () => {
  const [volumeHistory, setVolumeHistory] = useState<VolumeHistory[]>([]);
  const [isVolumeHistoryLoading, setIsVolumeHistoryLoading] =
    useState<boolean>(true);

  const [swapsLatest, setSwapsLatest] = useState<Swap[]>([]);
  const [isSwapsLatestLoading, setIsSwapsLatestLoading] =
    useState<boolean>(true);

  const [summary, setSummary] = useState<SummaryDto>({
    volume: 0,
    number: 0,
    unique_tokens: 0,
    unique_users: 0,
  });
  const [isSummaryLoading, setIsSummaryLoading] = useState<boolean>(true);

  const [topProfiters, setTopProfiters] = useState<UserStatsDto[]>([]);
  const [isTopProfitersLoading, setIsTopProfitersLoading] =
    useState<boolean>(true);

  const [topReferrers, setTopReferrers] = useState<UserStatsDto[]>([]);
  const [isTopReferrersLoading, setIsTopReferrersLoading] =
    useState<boolean>(true);

  const [selectedDataPeriod, setSelectedDataPeriod] = useState<DATA_PERIOD>(
    DATA_PERIOD.DAY
  );

  useEffect(() => {
    setIsVolumeHistoryLoading(true);
    setIsSwapsLatestLoading(true);
    setIsSummaryLoading(true);
    setIsTopProfitersLoading(true);
    setIsTopReferrersLoading(true);

    fetchVolumeHistory(selectedDataPeriod).then((data) => {
      setVolumeHistory(data);
      setIsVolumeHistoryLoading(false);
    });
    fetchLatestSwaps(selectedDataPeriod).then((data) => {
      setSwapsLatest(data);
      setIsSwapsLatestLoading(false);
    });
    fetchSummary(selectedDataPeriod).then((data) => {
      setSummary(data);
      setIsSummaryLoading(false);
    });
    fetchTopProfiters(selectedDataPeriod).then(({ data }) => {
      setTopProfiters(data);
      setIsTopProfitersLoading(false);
    });
    fetchTopReferrers(selectedDataPeriod).then(({ data }) => {
      setTopReferrers(data);
      setIsTopReferrersLoading(false);
    });
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
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Market Overview
        </Typography>
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
          sx={{ minHeight: '140px' }}
          size={{ xs: 12 }}
          isLoading={isSummaryLoading}
        >
          <SummaryDisplay summary={summary} />
        </ChartCustomContainer>
        <ChartCustomContainer
          sx={{ minHeight: '350px' }}
          isLoading={isVolumeHistoryLoading}
        >
          <ComposedBarLineChart data={volumeHistory} />
        </ChartCustomContainer>
        <ChartCustomContainer
          sx={{ minHeight: '350px' }}
          isLoading={isSwapsLatestLoading}
        >
          <SwapsTable data={swapsLatest} />
        </ChartCustomContainer>
        <ChartCustomContainer isLoading={isTopProfitersLoading}>
          <UserStatsTable data={topProfiters} />
        </ChartCustomContainer>
        <ChartCustomContainer isLoading={isTopReferrersLoading}>
          <UserStatsTable data={topReferrers} />
        </ChartCustomContainer>
      </Grid>
    </Box>
  );
};

export default MainPage;
