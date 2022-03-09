import { Grid } from '@mui/material';
import React from 'react';
import MenuBar from '../MenuBar';

function Flats() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <MenuBar />
      </Grid>
    </Grid>
  );
}

export default Flats;
