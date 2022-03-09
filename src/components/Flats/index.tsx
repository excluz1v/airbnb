import { Grid } from '@mui/material';
import React from 'react';
import MenuBar from '../MenuBar';
import FlatCard from './FlatCard';
import flatList from '../../flatsList';

function Flats() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <MenuBar />
        {flatList.map((flat) => {
          return <FlatCard {...flat} key={flat.id} />;
        })}
      </Grid>
    </Grid>
  );
}

export default Flats;
