import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Chip } from '@mui/material';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArbitrageDetails } from '../../api/types';
import { formatJettonAmount, moneyFormatter } from '../Charts/utils.ts';
import DexIcon from '../DexIcon';
import Tooltip from '@mui/material/Tooltip';

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
                {arbitrageDetails.dexes.map((dex, dexIndex) => {
                  return (
                    <DexIcon
                      altText={dex}
                      sizePx={24}
                      dex={dex}
                      key={`dexicon-${dex}-${dexIndex}`}
                      url={`https://tonviewer.com/transaction/${arbitrageDetails.traces[dexIndex]}`}
                    ></DexIcon>
                  );
                })}
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Breadcrumbs
                  separator="->"
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  maxItems={3}
                >
                  {arbitrageDetails.jettonSymbols.map(
                    (jettonSymbol, jettonsIndex) => (
                      <Tooltip
                        key={`tooltip-${arbitrageDetails.time}-${jettonSymbol}-${jettonsIndex}`}
                        title={`~${moneyFormatter.format(arbitrageDetails.amountsUsdPath[jettonsIndex])}`}
                      >
                        <Chip
                          key={`${arbitrageDetails.time}-${jettonSymbol}`}
                          label={
                            <>
                              <Typography fontSize={12}>
                                {jettonSymbol}
                              </Typography>
                              <Typography fontSize={10}>
                                {formatJettonAmount(
                                  arbitrageDetails.amountsPath[jettonsIndex],
                                  arbitrageDetails.jettonsDecimals[jettonsIndex]
                                )}
                              </Typography>
                            </>
                          }
                          size="medium"
                          variant="outlined"
                        />
                      </Tooltip>
                    )
                  )}
                </Breadcrumbs>
              </TableCell>
              <TableCell align="center" sx={{ p: 0 }}>
                <Tooltip
                  title={`${moneyFormatter.format(arbitrageDetails.usdProfit)}`}
                >
                  <Chip
                    label={`${arbitrageDetails.jettonSymbol} ${formatJettonAmount(arbitrageDetails.amountOut - arbitrageDetails.amountIn, arbitrageDetails.jettonDecimals)}`}
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
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Typography></Typography>
                <a
                  target="_blank"
                  href={`https://tonviewer.com/${arbitrageDetails.sender}`}
                >
                  {arbitrageDetails.shortUserHash}
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
