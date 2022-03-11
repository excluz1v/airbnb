import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useHistory, useParams } from 'react-router-dom';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import MenuBar from '../MenuBar';
import FlatCard from './FlatCard';
import SearchInput from './SearchInput';
import { Flat } from '../../../types';
import { MAX_FLATS_ON_PAGE } from '../../common/constants';
import FlatMap from './FlatMap';

type TParams = {
  id: string | undefined;
};

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
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const url = new URL(window.location.href);
  const cityFromUrl = url.searchParams.get('city');
  const history = useHistory();
  const { id } = useParams<TParams>();

  function onCHangeHandler(city: string, flatId: string | undefined) {
    if (city.trim()) {
      history.replace(`?city=${city}`);
    } else {
      const path = flatId ? `/flats/${flatId}` : '/flats';
      history.replace(path);
    }
    setAddress(city);
  }

  function pickFlatHandler(lat: number, lng: number) {
    setCoordinates({ lat, lng });
  }

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

  useEffect(() => {
    if (cityFromUrl) setAddress(cityFromUrl);
  }, [cityFromUrl]);

  useEffect(() => {
    if (flatList) {
      const existFlat = flatList.find((flat) => flat.id === id);
      if (existFlat)
        setCoordinates({ lat: existFlat.latitude, lng: existFlat.longitude });
    }
  }, [flatList, id]);

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
            <Box bgcolor="#fff" position="sticky" top={0} zIndex={2} pt="2rem">
              <SearchInput value={address} onChange={onCHangeHandler} id={id} />
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
                  return (
                    <FlatCard
                      {...flat}
                      key={flat.id}
                      isSelected={id === flat.id}
                      cityFromUrl={cityFromUrl}
                      handler={pickFlatHandler}
                    />
                  );
                })}
          </Box>
        </Grid>
        <Grid item xs={7} position="sticky" top={0}>
          <FlatMap {...coordinates} id={id} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Flats;
