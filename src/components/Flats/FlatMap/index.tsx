import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flat } from '../../../../types';

type TProps = {
  flatList: Flat[];
};

function initMap(element: HTMLElement, lat: number, lng: number) {
  const properties = Object.getOwnPropertyNames(window);
  if (properties.includes('google')) {
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
}

type TParams = {
  id: string | undefined;
};

function FlatMap(props: TProps): JSX.Element {
  const { flatList } = props;

  const mapRef = useRef<HTMLElement>(null);
  const { id } = useParams<TParams>();
  const [existFlat, setExistFlat] = useState<Flat | undefined>(undefined);
  useEffect(() => {
    const mathcflat = flatList.find((flat) => flat.id === id);
    setExistFlat(mathcflat);
  }, [flatList, id]);

  useEffect(() => {
    const mapContainer = mapRef.current;
    if (existFlat && mapContainer) {
      const lat = existFlat.latitude;
      const lng = existFlat.longitude;
      initMap(mapContainer, lat, lng);
    }
  }, [existFlat, id, mapRef]);

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
      {id && !existFlat && (
        <Typography variant="h4">Failed to load the flat</Typography>
      )}
    </Box>
  );
}
export default FlatMap;
