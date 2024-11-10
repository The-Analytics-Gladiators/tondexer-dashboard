import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ArbitragePage from '../pages/ArbitragePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/arb" element={<ArbitragePage />} />
    </Routes>
  );
};

export default AppRouter;
