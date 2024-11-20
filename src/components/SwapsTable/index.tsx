import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Swap } from '../../api/types';
import { formatJettonAmount, moneyFormatter } from '../Charts/utils.ts';
import DexIcon from '../DexIcon';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { shortenHash } from '../../api/transformers/index.ts';
import ExternalLink from '../ExternalLink/index.tsx';

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
                <ExternalLink url={`https://tonviewer.com/transaction/${swap.hashes[0]}`} />
              </TableCell>
              <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                <DexIcon
                  altText={swap.dex}
                  sizePx={24}
                  dex={swap.dex}
                  key={`dexicon-${swap.dex}`}
                  url={`https://tonviewer.com/${swap.poolAddress}`}
                ></DexIcon>
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Breadcrumbs separator="->" sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Tooltip
                    title={`~${moneyFormatter.format(swap.inUsd)}`}
                  >
                    <Chip
                      key={`${swap.time}-${swap.jettonInName}`}
                      label={
                        <>
                          <Typography fontSize={12}>
                            {swap.jettonInSymbol} {formatJettonAmount(swap.amountIn, swap.jettonInDecimals)}
                          </Typography>
                        </>
                      }
                      variant="outlined"
                    />
                  </Tooltip>
                  <Tooltip
                    title={`~${moneyFormatter.format(swap.outUsd)}`}
                  >
                    <Chip
                      key={`${swap.time}-${swap.jettonOutName}`}
                      label={
                        <>
                          <Typography fontSize={12}>
                            {swap.jettonOutSymbol} {formatJettonAmount(swap.amountOut, swap.jettonOutDecimals)}
                          </Typography>
                        </>
                      }
                      variant="outlined"
                    />
                  </Tooltip>
                </Breadcrumbs>
              </TableCell>
              <TableCell align="center">
                <a
                  target="_blank"
                  href={`https://tonviewer.com/${swap.sender}`}
                >
                  {shortenHash(swap.sender)}
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
