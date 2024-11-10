import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppRouter from './routes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100dvh', width: '100dvw' }}>
        <Router>
          <AppRouter />
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
