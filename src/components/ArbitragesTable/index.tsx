import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArbitrageDetails } from '../../api/types';
import { moneyFormatter } from '../Charts/utils.ts';
import Typography from '@mui/material/Typography';

dayjs.extend(relativeTime);

type ArbitragesTableProps = {
  data: ArbitrageDetails[];
};

const ArbitragesTable = ({ data }: ArbitragesTableProps) => {
  return (
    <TableContainer sx={{ maxHeight: 300, overflowY: 'auto' }}>
      <Table aria-label="simple table" stickyHeader>
        <TableBody>
          {data.map((arbitrageDetails: ArbitrageDetails, index) => (
            <TableRow
              key={`${arbitrageDetails.time}${arbitrageDetails.sender}${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" sx={{ p: 0 }}>
                <Typography variant="subtitle2">
                  {dayjs(arbitrageDetails.time).fromNow()}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Chip label={arbitrageDetails.dexes.join('-')} size="small" />
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                {arbitrageDetails.jettonArbitrage.map((jettonArbitrage) => (
                  <Chip
                    key={`${arbitrageDetails.time}-${jettonArbitrage}`}
                    label={`${jettonArbitrage}`}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Chip
                  label={moneyFormatter.format(arbitrageDetails.usdProfit)}
                  key={`profit_${arbitrageDetails.time}_${arbitrageDetails.usdProfit}`}
                  color={
                    arbitrageDetails.amountOutUsd -
                      arbitrageDetails.amountInUsd >
                    0
                      ? 'success'
                      : 'error'
                  }
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center">
                <Typography>{arbitrageDetails.shortUserHash}</Typography>
                <a
                  target="_blank"
                  href={`https://tonviewer.com/${arbitrageDetails.sender}`}
                >
                  <AccountCircleIcon />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ArbitragesTable;
