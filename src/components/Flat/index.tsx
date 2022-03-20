import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Box } from '@mui/system';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { useLocation } from 'react-router-dom';
import { DocumentData, Query } from '@firebase/firestore-types';
import FlatCard from './FlatCard';
import SearchInput from './SearchInput';
import CreateButton from './CreateButton';
import { Flat } from '../../../types';
import { MAX_FLATS_ON_PAGE } from '../../common/constants';
import FlatMap from './FlatMap';
import useStyles from './styles';
import MenuBar from '../Unknown/MenuBar';
import extractCityFromURL from '../../common/functions';
import CreatingFlat from './CreatingFlat';

function FlatListScreen(): JSX.Element {
  const [backdrop, setbackdrop] = useState(false);
  const classes = useStyles();
  const { search } = useLocation();
  const cityFromUrl = extractCityFromURL(search);
  const flats = useFirestore().collection('flats');
  let query: Query<DocumentData>;
  if (cityFromUrl) {
    query = flats.where('cityName', '==', cityFromUrl);
  } else query = flats;

  const { data } = useFirestoreCollectionData<Flat>(
    query.limit(MAX_FLATS_ON_PAGE),
    {
      idField: 'id',
    },
  );

  return (
    <Grid container position="relative">
      {backdrop && <CreatingFlat open={backdrop} setbackdrop={setbackdrop} />}
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
              <SearchInput />
            </Box>
            <Typography pt={3} variant="h3">
              Flats to rent
            </Typography>
            {data &&
              data.map((flat) => {
                return <FlatCard {...flat} key={flat.id} />;
              })}
          </Box>
        </Grid>
        <Grid item xs={7} position="sticky" height="100vh" top={0}>
          <FlatMap flatList={data} />
          <CreateButton onclick={setbackdrop} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FlatListScreen;
