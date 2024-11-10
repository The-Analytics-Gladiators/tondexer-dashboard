import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { VolumeHistory } from '../../../api/types';
import { countFormatter, moneyFormatter } from '../utils.ts';

type ComposedBarLineChartProps = {
  data: VolumeHistory[];
};

const ComposedBarLineChart = ({ data }: ComposedBarLineChartProps) => {
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
        <XAxis dataKey="name" scale="band" fontSize={10} />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Legend />
        <Bar
          name="Volume of transactions"
          yAxisId="left"
          dataKey="volume"
          display="volumeFormatted"
          barSize={20}
          fill="#413ea0"
        ></Bar>
        <Tooltip
          formatter={(value: number, name: string) => {
            return name === 'Volume of transactions'
              ? [moneyFormatter.format(value), name]
              : [countFormatter.format(value), name];
          }}
        />
        <Line
          yAxisId="right"
          name="Number of transactions"
          type="monotone"
          dataKey="number"
          stroke="#ff7300"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedBarLineChart;
