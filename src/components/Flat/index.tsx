import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { useLocation } from 'react-router-dom';
import FlatCard from './FlatCard';
import SearchInput from './SearchInput';
import { Flat } from '../../../types';
import { MAX_FLATS_ON_PAGE } from '../../common/constants';
import FlatMap from './FlatMap';
import useStyles from './styles';
import MenuBar from '../Unknown/MenuBar';

function FlatListScreen(): JSX.Element {
  const classes = useStyles();
  const { search } = useLocation();
  const cityFromUrl = new URLSearchParams(search).get('city');
  const db = useFirestore();
  let flatsQuery;
  if (cityFromUrl) {
    flatsQuery = db
      .collection('flats')
      .orderBy('cityName')
      .where('cityName', '==', cityFromUrl)
      .orderBy('publishedAt')
      .limit(MAX_FLATS_ON_PAGE);
  } else
    flatsQuery = db
      .collection('flats')
      .orderBy('publishedAt')
      .limit(MAX_FLATS_ON_PAGE);

  const { data } = useFirestoreCollectionData<Flat>(flatsQuery, {
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
          {data && <FlatMap flatList={data} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default FlatListScreen;
