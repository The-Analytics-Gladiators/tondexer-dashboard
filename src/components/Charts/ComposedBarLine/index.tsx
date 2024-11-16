import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { Props as BarComponentProps } from 'recharts/types/cartesian/Bar';
import { Props as LineComponentProps } from 'recharts/types/cartesian/Line';

import { VolumeHistory } from '../../../api/types';
import { countFormatter, moneyFormatter } from '../utils.ts';

type ComposedBarLineChartProps = {
  data: VolumeHistory[];
  bars: BarComponentProps[];
  lines: LineComponentProps[];
  xAxisDataKey: string;
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
        <Tooltip
          formatter={(value: number, name: string) => {
            // TODO: shit but ok for now
            return name.endsWith('Volume')
              ? [moneyFormatter.format(value), name]
              : [countFormatter.format(value), name];
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ComposedBarLineChart;
