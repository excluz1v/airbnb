import { TextField } from '@mui/material';
import React, { useEffect } from 'react';

function SearchInput() {
  useEffect(() => {
    async function getLibrary() {
      try {
        const library = await fetch(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places&callback=initMap`,
        );
        return library;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    // const library = getLibrary();
  }, []);

  return (
    <TextField variant="filled" label="city" placeholder="type something">
      SearchInput
    </TextField>
  );
}

export default SearchInput;
