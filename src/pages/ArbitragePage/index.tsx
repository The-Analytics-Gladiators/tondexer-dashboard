import { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Props as BarComponentProps } from 'recharts/types/cartesian/Bar';
import { Props as LineComponentProps } from 'recharts/types/cartesian/Line';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Box from '@mui/material/Box';
import { DATA_PERIOD, fetchArbitrageVolumeHistory } from '../../api';
import { ArbitrageVolumeHistory } from '../../api/types';
import ComposedBarLineChart from '../../components/Charts/ComposedBarLine';
import ChartCustomContainer from '../../components/ChartContainer';

const ArbitragePage = () => {
  const [selectedDataPeriod, setSelectedDataPeriod] = useState<DATA_PERIOD>(
    DATA_PERIOD.DAY
  );

  const [arbVolumeHistory, setArbVolumeHistory] = useState<
    ArbitrageVolumeHistory[]
  >([]);
  const [isArbVolumeHistoryLoading, setIsArbVolumeHistoryLoading] =
    useState<boolean>(true);

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

  useEffect(() => {
    setIsArbVolumeHistoryLoading(true);
    fetchArbitrageVolumeHistory(selectedDataPeriod)
      .then((data) => {
        setArbVolumeHistory(data);
        setIsArbVolumeHistoryLoading(false);
      })
      .catch(() => {
        setIsArbVolumeHistoryLoading(false);
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
          Arbitrages Overview
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
          sx={{ minHeight: '350px' }}
          isLoading={isArbVolumeHistoryLoading}
        >
          <ComposedBarLineChart
            data={arbVolumeHistory}
            bars={composedChartBarsConfig}
            lines={composedChartLinesConfig}
            xAxisDataKey="name"
          />
        </ChartCustomContainer>
      </Grid>
    </Box>
  );
};

export default ArbitragePage;
