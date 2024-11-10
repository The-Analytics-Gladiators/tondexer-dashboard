import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';

const AppSideMenu = () => {
  return (
    <Drawer anchor="left" open variant="persistent">
      <Box>
        <Stack>
          <ListSubheader>Pages</ListSubheader>
          <MenuItem value="/">Main page</MenuItem>
          <MenuItem value="/arbitrage">Arbitrage</MenuItem>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default AppSideMenu;
