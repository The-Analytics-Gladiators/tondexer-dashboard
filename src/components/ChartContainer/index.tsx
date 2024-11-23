import Grid from '@mui/material/Grid2';
import { ReactNode } from 'react';
import { Skeleton, SxProps } from '@mui/material';
import { Breakpoint } from '@mui/material/styles';
import { TABLE_HEIGHT } from '../Charts/utils.ts';
import Typography from '@mui/material/Typography';
import { HelpOutline } from '@mui/icons-material';
import Grid2 from '@mui/material/Grid2';
import Tooltip from '@mui/material/Tooltip';

type ChartContainerProps = {
  isLoading: boolean;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: { [key in Breakpoint]?: number | null };
  sx?: SxProps;
};

const ChartCustomContainer = ({
  children,
  isLoading,
  sx = {},
  title,
  description,
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
      {title && (
        <Grid2 flexDirection="row" container justifyContent="space-between">
          <Typography marginBottom="10px" variant="h6">
            {title}
          </Typography>
          {description && (
            <Tooltip title={description}>
              <HelpOutline
                sx={{ fill: 'rgba(255, 255, 255, 0.16)' }}
                fontSize="medium"
              />
            </Tooltip>
          )}
        </Grid2>
      )}
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
