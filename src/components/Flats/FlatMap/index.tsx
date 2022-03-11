import { Box, Typography } from '@mui/material';
import React from 'react';

function FlatMap(): JSX.Element {
  return (
    <Box
      bgcolor="#BDBDBD"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="sticky"
      top={0}
      color="#FFF"
    >
      <Typography variant="h4">No flat selected</Typography>
    </Box>
  );
}

export default FlatMap;
