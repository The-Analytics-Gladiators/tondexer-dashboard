import { Divider, Grid2 as Grid, Typography } from '@mui/material';
import { TooltipProps, Treemap, Tooltip, ResponsiveContainer } from 'recharts';
import { TreemapNode } from 'recharts/types/util/types';
import { CHART_HEIGHT, moneyFormatter } from '../utils';
import DexIcon from '../../DexIcon';

export type TreemapData = {
  name: string;
  url: string;
  usd: number;
  dex?: string;
  size: number;
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
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '25px',
          padding: '10px',
          color: 'white',
        }}
      >
        <Typography variant="subtitle1">{`${label}`}</Typography>
        <Divider />
        {payload.map((payloadItem, ind) => {
          return (
            <Grid
              key={`${payloadItem.color}_${payloadItem.name}_${ind}`}
              container
              direction="column"
              spacing={2}
            >
              <Typography variant="subtitle2" key={payloadItem.dataKey}>
                {payloadItem.payload.dex && (
                  <DexIcon
                    altText={payloadItem.payload.dex}
                    sizePx={24}
                    dex={payloadItem.payload.dex}
                    key={`dexicon-${payloadItem.payload.dex}`}
                  ></DexIcon>
                )}
                <span style={{ fontWeight: 'bold' }}>
                  {payloadItem.payload.name}
                </span>
                : {moneyFormatter.format(payloadItem.payload.usd)}
              </Typography>
            </Grid>
          );
        })}
      </div>
    );
  }

  return null;
};

interface NodeProps extends TreemapNode {
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  index: number;
}

const colors: string[] = [
  '#7b1fa2',
  '#01579b',
  '#cc9900',
  '#01579b',
  '#004c8c',
  '#4a148c',
  '#1a237e',
  '#004c8c',
  '#4a148c',
  '#1a237e',
];

const CustomContent = (props: NodeProps & TreemapData) => {
  const x = props.x;
  const y = props.y;
  const width = props.width;
  const height = props.height;

  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <g href={props.url}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={colors[props.index % colors.length]}
          stroke="#616161"
        />
        <text
          fontFamily="Roboto, Helvetica, sans-serif" // Why not? :D Nick!...
          x={x + 10}
          y={y + height / 2}
          style={{ fontWeight: 'bold', fontSize: 12 }}
          visibility={'visible'}
        >
          {props.name}
        </text>
      </g>
    </a>
  );
};

type TreemapProps = {
  data: TreemapData[];
};

const CustomTreemap = ({ data }: TreemapProps) => {
  return (
    <ResponsiveContainer width="100%" height="80%">
      <Treemap
        width={300}
        height={CHART_HEIGHT}
        data={data}
        dataKey="size"
        fill="#fff"
        content={
          <CustomContent
            x={0}
            y={0}
            width={0}
            height={0}
            depth={0}
            index={0}
            name={''}
            url={''}
            dex={''}
            usd={0}
            value={0}
            size={0}
          />
        }
      >
        <Tooltip content={CustomTooltip} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default CustomTreemap;
