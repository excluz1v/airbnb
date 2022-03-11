import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';

type TProps = {
  id: string | undefined;
  lat: number;
  lng: number;
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

const FlatMap = React.memo(function FlatMap(props: TProps): JSX.Element {
  const { id, lat, lng } = props;
  const mapRef = useRef<HTMLElement>(null);
  const mapContainer = mapRef.current;

  useEffect(() => {
    if (mapContainer) initMap(mapContainer, lat, lng);
  }, [mapContainer, lat, lng]);

  return (
    <Box
      bgcolor="#BDBDBD"
      height="100vh"
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
