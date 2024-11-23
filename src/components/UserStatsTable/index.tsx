import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Chip } from '@mui/material';
import { moneyFormatter, TABLE_HEIGHT } from '../Charts/utils.ts';
import { UserStatsDto } from '../../api/types';
import { shortenHash } from '../../api/transformers/index.ts';

type NewSwapsTableProps = {
  data: UserStatsDto[];
};

const UserStatsTable = ({ data }: NewSwapsTableProps) => {
  return (
    <TableContainer sx={{ maxHeight: TABLE_HEIGHT, overflowY: 'auto' }}>
      <Table aria-label="simple table" stickyHeader>
        <TableBody>
          {data.map((swap: UserStatsDto, index) => (
            <TableRow
              key={`${swap.user_address}${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
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
              <TableCell align="center" sx={{ p: 0 }}>
                <a
                  target="_blank"
                  href={`https://tonviewer.com/${swap.user_address}`}
                >
                  {shortenHash(swap.user_address)}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserStatsTable;
