import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Props as BarComponentProps } from 'recharts/types/cartesian/Bar';
import { Props as LineComponentProps } from 'recharts/types/cartesian/Line';
import { VolumeHistory, ArbitrageVolumeHistory } from '../../../api/types';
import { countFormatter, isMoneyField, moneyFormatter } from '../utils.ts';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

type ComposedBarLineChartProps = {
  data: VolumeHistory[] | ArbitrageVolumeHistory[];
  bars: BarComponentProps[];
  lines: LineComponentProps[];
  xAxisDataKey: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<string, never>) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '25px',
          padding: '10px',
          color: 'white',
        }}
      >
        <Typography variant="subtitle1">{`${label}`}</Typography>
        <Divider />
        {payload.map((payloadItem) => {
          // @ts-expect-error mismatched chart types from the library
          const value = isMoneyField(payloadItem.dataKey)
            ? // @ts-expect-error mismatched chart types from the library
              moneyFormatter.format(payloadItem.value)
            : // @ts-expect-error mismatched chart types from the library
              countFormatter().format(payloadItem.value);
          return (
            <Typography variant="subtitle2" key={payloadItem.dataKey}>
              {`${payloadItem.name} : ${value}`}
            </Typography>
          );
        })}
      </div>
    );
  }

  return null;
};

const ComposedBarLineChart = ({
  data,
  bars,
  lines,
  xAxisDataKey,
}: ComposedBarLineChartProps) => {
  const renderedBars = bars.map((bar) => {
    // @ts-expect-error mismatched chart types from the library
    return <Bar key={`bar_${bar.dataKey}`} {...bar} />;
  });
  const renderedLines = lines.map((line) => {
    // @ts-expect-error mismatched chart types from the library
    return <Line key={`line_${line.dataKey}`} {...line} />;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey={xAxisDataKey} scale="band" fontSize={10} />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Legend />
        {...renderedBars}
        {...renderedLines}
        <Tooltip content={CustomTooltip} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedBarLineChart;
