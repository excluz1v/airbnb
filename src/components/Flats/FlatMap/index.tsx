import { Box, Typography } from '@mui/material';
import React from 'react';

type TProps = {
  id: string | undefined;
};

function FlatMap(props: TProps): JSX.Element {
  const { id } = props;
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
      {!id && <Typography variant="h4">No flat selected</Typography>}
      {id && <Typography variant="h4">Loaded</Typography>}
    </Box>
  );
}

export default FlatMap;
