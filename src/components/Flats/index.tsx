import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import MenuBar from '../MenuBar';
import FlatCard from './FlatCard';
import flatList from '../../flatsList';
import SearchInput from './SearchInput';
import { TFlat } from '../../../types';
import { MAX_FLATS_ON_PAGE } from '../../common/constants';

function Flats() {
  const [address, setAddress] = useState('');
  const url = new URL(window.location.href);
  const cityFromUrl = url.searchParams.get('city');

  useEffect(() => {
    if (cityFromUrl) setAddress(cityFromUrl);
  }, [cityFromUrl]);

  function filterFlats(flat: TFlat) {
    if (address === '') return true;
    const city = address.split(',')[0];
    if (flat.city) return flat.city.includes(city);
    return false;
  }

  function showLimitAmount(flat: TFlat, index: number) {
    if (index < MAX_FLATS_ON_PAGE) return true;
    return false;
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
          {flatList &&
            flatList
              .filter(filterFlats)
              .filter(showLimitAmount)
              .map((flat) => {
                return <FlatCard {...flat} key={flat.id} />;
              })}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Flats;
