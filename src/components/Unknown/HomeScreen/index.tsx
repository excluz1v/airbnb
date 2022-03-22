import { Box } from '@mui/material';
import React from 'react';
import HomeMenu from './HomeMenu/HomeMenu';

const HomeScreen: React.FC = () => {
  return (
    <Box height="100vh" display="flex">
      <HomeMenu />
    </Box>
  );
};

export default HomeScreen;
