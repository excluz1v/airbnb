import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Flat } from '../../../../types';

type TProps = {
  flatList: Flat[];
};

function initMap(element: HTMLElement, lat: number, lng: number) {
  // The location of Uluru
  const uluru = { lat, lng };
  // The map, centered at Uluru
  const map = new google.maps.Map(element, {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map,
  });
}

type TParams = {
  id: string | undefined;
};

const FlatMap = React.memo(function FlatMap(props: TProps): JSX.Element {
  const { flatList } = props;
  const mapRef = useRef<HTMLElement>(null);
  const mapContainer = mapRef.current;
  const { id } = useParams<TParams>();

  useEffect(() => {
    if (flatList) {
      const existFlat = flatList.find((flat) => flat.id === id);
      if (existFlat && mapContainer) {
        const lat = existFlat.latitude;
        const lng = existFlat.longitude;
        initMap(mapContainer, lat, lng);
      }
    }
  }, [flatList, id, mapContainer]);

  return (
    <Box
      bgcolor="#BDBDBD"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="#FFF"
      ref={mapRef}
      component="div"
    >
      {!id && <Typography variant="h4">No flat selected</Typography>}
      {/* {id && <Typography variant="h4">Loading</Typography>} */}
    </Box>
  );
});
export default FlatMap;
