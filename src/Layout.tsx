import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { Header, HEADER_HEIGHT } from './widgets/Header/Header';

export function Layout() {
  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <Header />
      <Box sx={{ height: `calc(100% - ${HEADER_HEIGHT}px)`, width: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
