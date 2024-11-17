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
import { countFormatter, moneyFormatter } from '../Charts/utils.ts';
import DexIcon from '../DexIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

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
                <DexIcon
                  altText={swap.dex}
                  sizePx={24}
                  dex={swap.dex}
                  key={`dexicon-${swap.dex}`}
                ></DexIcon>
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Breadcrumbs separator="->">
                  <Tooltip
                    title={`${swap.jettonInName}: ${countFormatter(8).format(swap.amountIn)}`}
                  >
                    <Chip
                      key={`${swap.time}-${swap.jettonInName}`}
                      label={
                        <>
                          <Typography fontSize={12}>
                            {swap.jettonInSymbol}
                          </Typography>
                          <Typography fontSize={10}>
                            {countFormatter(4).format(swap.amountIn)}
                          </Typography>
                        </>
                      }
                      size="medium"
                      variant="outlined"
                    />
                  </Tooltip>
                  <Tooltip
                    title={`${swap.jettonOutName}: ${countFormatter(8).format(swap.amountOut)}`}
                  >
                    <Chip
                      key={`${swap.time}-${swap.jettonOutName}`}
                      label={
                        <>
                          <Typography fontSize={12}>
                            {swap.jettonOutSymbol}
                          </Typography>
                          <Typography fontSize={10}>
                            {countFormatter(4).format(swap.amountOut)}
                          </Typography>
                        </>
                      }
                      size="medium"
                      variant="outlined"
                    />
                  </Tooltip>
                </Breadcrumbs>
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
