import { Grid } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import MenuBar from '../MenuBar';
import FlatCard from './FlatCard';
import flatList from '../../flatsList';

function Flats() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" rowGap={5}>
          <MenuBar />
          {flatList.map((flat) => {
            return <FlatCard {...flat} key={flat.id} />;
          })}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Flats;
