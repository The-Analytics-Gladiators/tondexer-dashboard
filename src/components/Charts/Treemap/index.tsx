import { Divider, Grid2 as Grid, Typography } from "@mui/material";
import { TooltipProps, Treemap, Tooltip } from "recharts"
import { TreemapNode } from "recharts/types/util/types";
import { moneyFormatter } from "../utils";
import DexIcon from "../../DexIcon";


export type TreemapData = {
  name: string,
  url: string,
  usd: number,
  dex?: string,
  size: number,
}

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
        {payload.map((payloadItem) => {
          return (
		   <Grid container direction="column" spacing={2}>
		     <Grid>
               <Typography variant="subtitle2" key={payloadItem.dataKey}>
			    {payloadItem.payload.dex && <DexIcon
                  altText={payloadItem.payload.dex}
                  sizePx={24}
                  dex={payloadItem.payload.dex}
                  key={`dexicon-${payloadItem.payload.dex}`}
                ></DexIcon>}
                 <span style={{ fontWeight: 'bold' }}>{payloadItem.payload.name}</span>: {moneyFormatter.format(payloadItem.payload.usd)}
               </Typography>
 			</Grid>
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

const colors: string[] = ['#66dcfb', '#58a3e4', '#8478e3', '#4d9cb0', '#68e1ff', '#ad76e3', '#8478e4', '#353548', '#59a5e4', '#7f88e3'];

const CustomContent = (props: NodeProps & TreemapData) => {
	let x = props.x
	let y = props.y
	let width = props.width
	let height = props.height

	//Where is the ****ing center of the rectangle?) Nick :)
  return <a href={props.url} target="_blank" rel="noopener noreferrer">
    <g href={props.url}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
		fill={colors[props.index % colors.length]}
        stroke="#fff"
      />
      <text
	    fontFamily="Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif" // Why not? :D Nick!...
        x={x + 10 }
        y={y + height / 2}
        style={props.textStyle}
        visibility={'visible'}
      >
	  {props.name}
      </text>
    </g>
  </a>
}

type TreemapProps = {
  data: TreemapData[]
}

const CustomTreemap = ({ data }: TreemapProps) => {

  return <Treemap
  width={480}
  height={250}
  data={data}
  dataKey="size"
  // aspectRatio={4 / 3}
  stroke="#fff"
  fill="#8884d8"
  content={<CustomContent x={0} y={0} width={0} height={0} depth={0} index={0} name={""} url={""} dex={""} usd={0} value={0} size={0} />} // Mr Gattuso, please help!
>
<Tooltip content={CustomTooltip} />
</Treemap>

}


export default CustomTreemap
