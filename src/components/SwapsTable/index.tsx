import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Swap } from '../../api/types';
import { moneyFormatter } from '../Charts/utils.ts';

dayjs.extend(relativeTime);

type SwapsTableProps = {
  data: Swap[];
};

const SwapsTable = ({ data }: SwapsTableProps) => {
  return (
    <TableContainer sx={{ maxHeight: 300, overflowY: 'auto' }}>
      <Table aria-label="simple table" stickyHeader>
        <TableBody>
          {data.map((swap: Swap, index) => (
            <TableRow
              key={`${swap.time}${swap.sender}${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" sx={{ p: 0 }}>
                {dayjs(swap.time).fromNow()}
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Chip label={swap.dex} size="small" />
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Chip
                  label={swap.jettonInSymbol}
                  size="small"
                  variant="outlined"
                />
                {'>'}
                <Chip label={swap.jettonOutSymbol} size="small" />
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Chip
                  label={moneyFormatter.format(swap.inUsd)}
                  size="small"
                  variant="outlined"
                />
                {'>'}
                <Chip label={moneyFormatter.format(swap.outUsd)} size="small" />
              </TableCell>
              <TableCell align="center">
                <a
                  target="_blank"
                  href={`https://tonviewer.com/${swap.sender}`}
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

export default SwapsTable;
