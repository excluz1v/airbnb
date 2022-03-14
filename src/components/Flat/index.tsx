import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import MenuBar from '../MenuBar';
import FlatCard from './FlatCard';
import SearchInput from './SearchInput';
import { Flat } from '../../../types';
import { MAX_FLATS_ON_PAGE } from '../../common/constants';
import FlatMap from './FlatMap';
import useStyles from './styles';

function showLimitAmount(flat: Flat, index: number) {
  if (index < MAX_FLATS_ON_PAGE) return true;
  return false;
}

function sortByDate(a: Flat, b: Flat) {
  const dateA = a.publishedAt.toDate().getTime();
  const dateB = b.publishedAt.toDate().getTime();
  return dateB - dateA;
}

function Flats(): JSX.Element {
  const classes = useStyles();
  const url = new URL(window.location.href);
  const cityFromUrl = url.searchParams.get('city');
  const [address, setAddress] = useState(cityFromUrl || '');
  function filterFlats(flat: Flat) {
    if (address === '') return true;
    const city = address.split(',')[0];
    if (flat.cityName) return flat.cityName.includes(city);
    return false;
  }

  const db = useFirestore();
  const flatsCol = db.collection('flats');
  const { data: flatList } = useFirestoreCollectionData<Flat>(flatsCol, {
    idField: 'id',
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <MenuBar />
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <Box
            display="flex"
            flexDirection="column"
            rowGap={5}
            p={3}
            pt={0}
            position="relative"
          >
            <Box className={classes.inputWrapper}>
              <SearchInput value={address} setAddress={setAddress} />
            </Box>
            <Typography pt={3} variant="h3">
              Flats to rent
            </Typography>
            {flatList &&
              flatList
                .filter(filterFlats)
                .filter(showLimitAmount)
                .sort(sortByDate)
                .map((flat) => {
                  return <FlatCard {...flat} key={flat.id} />;
                })}
          </Box>
        </Grid>
        <Grid item xs={7} position="sticky" height="100vh" top={0}>
          {flatList && <FlatMap flatList={flatList} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Flats;
