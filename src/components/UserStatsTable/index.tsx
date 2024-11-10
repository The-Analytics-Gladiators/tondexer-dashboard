import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Chip } from '@mui/material';
import { moneyFormatter } from '../Charts/utils.ts';
import { UserStatsDto } from '../../api/types';

type NewSwapsTableProps = {
  data: UserStatsDto[];
};

const UserStatsTable = ({ data }: NewSwapsTableProps) => {
  return (
    <TableContainer sx={{ maxHeight: 200, overflowY: 'auto' }}>
      <Table aria-label="simple table" stickyHeader>
        <TableBody>
          {data.map((swap: UserStatsDto, index) => (
            <TableRow
              key={`${swap.user_address}${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" sx={{ p: 0 }}>
                <a
                  target="_blank"
                  href={`https://tonviewer.com/${swap.user_address}`}
                >
                  <AccountCircleIcon />
                </a>
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Chip
                  label={moneyFormatter.format(swap.amount_usd)}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Chip label={`${swap.tokens.toString()} tokens`} size="small" />
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Chip
                  label={`${swap.count.toString()} transactions`}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserStatsTable;
