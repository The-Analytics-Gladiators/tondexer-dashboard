import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { SummaryDto } from '../../api/types';
import { countFormatter } from '../Charts/utils.ts';

type SummaryProps = {
  summary: SummaryDto;
};

const SummaryDisplay = ({ summary }: SummaryProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid>
          <Typography variant="h2">
            {countFormatter.format(summary.volume)}
          </Typography>
          <Typography variant="subtitle1">Total Volume</Typography>
        </Grid>
        <Grid>
          <Typography variant="h2">
            {countFormatter.format(summary.number)}
          </Typography>
          <Typography variant="subtitle1">Total Transactions Number</Typography>
        </Grid>
        <Grid>
          <Typography variant="h2">
            {countFormatter.format(summary.unique_tokens)}
          </Typography>
          <Typography variant="subtitle1">Unique Tokens</Typography>
        </Grid>
        <Grid>
          <Typography variant="h2">
            {countFormatter.format(summary.unique_users)}
          </Typography>
          <Typography variant="subtitle1">Unique Users</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryDisplay;
