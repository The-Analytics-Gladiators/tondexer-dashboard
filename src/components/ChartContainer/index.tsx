import Grid from '@mui/material/Grid2';
import { ReactNode } from 'react';
import { Skeleton, SxProps } from '@mui/material';
import { Breakpoint } from '@mui/material/styles';
import { TABLE_HEIGHT } from '../Charts/utils.ts';

type ChartContainerProps = {
  isLoading: boolean;
  children: ReactNode;
  size?: { [key in Breakpoint]?: number | null };
  sx?: SxProps;
};

const ChartCustomContainer = ({
  children,
  isLoading,
  sx = {},
  size = { xs: 12, lg: 6 },
}: ChartContainerProps) => {
  return (
    <Grid
      size={size}
      sx={{
        backgroundColor: '#242529',
        padding: '20px',
        borderRadius: '25px',
        maxHeight: TABLE_HEIGHT + 100,
        ...sx,
      }}
    >
      {isLoading ? (
        <>
          <Skeleton variant="rounded" height="80%" width="100%" />
          <Skeleton width="70%" />
        </>
      ) : (
        children
      )}
    </Grid>
  );
};

export default ChartCustomContainer;
