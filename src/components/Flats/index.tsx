import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import MenuBar from '../MenuBar';
import FlatCard from './FlatCard';
import flatList from '../../flatsList';
import SearchInput from './SearchInput';
import { TFlat } from '../../../types';

function Flats() {
  const [address, setAddress] = useState('');

  function filterFlats(flat: TFlat) {
    if (address === '') return true;
    const city = address.split(',')[0];
    return flat.city.includes(city);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <MenuBar />
        <Box
          display="flex"
          flexDirection="column"
          rowGap={5}
          p={3}
          maxWidth={580}
        >
          <SearchInput value={address} onChange={setAddress} />
          {flatList.filter(filterFlats).map((flat) => {
            return <FlatCard {...flat} key={flat.id} />;
          })}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Flats;
