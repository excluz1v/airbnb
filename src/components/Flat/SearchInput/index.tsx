import { Search } from '@mui/icons-material';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import extractCityFromURL from '../../../common/functions';

const extractAddress = (place: google.maps.places.PlaceResult) => {
  const address = {
    city: '',
    country: '',
  };
  if (place.name) {
    const cityWIthCountry = place.name.split(',');
    const [parsedSCity = '', parsedCountry = ''] = cityWIthCountry;
    address.city = parsedSCity;
    address.country = parsedCountry;
    return address;
  }
  return null;
};

type TParams = {
  id: string | undefined;
};

const SearchInput = React.memo(function SearchInput(): JSX.Element {
  const { id } = useParams<TParams>();
  const searchInput = useRef<HTMLInputElement>(null);
  const history = useHistory();
  const [address, setAddress] = useState('');

  function onChangeHandler(city: string, flatId: string | undefined) {
    if (city.trim()) {
      history.replace(`?city=${city}`);
    } else {
      const path = flatId ? `/flats/${flatId}` : '/flats';
      history.replace(path);
    }
    setAddress(city);
  }

  // do something on address change
  const onChangeAddress = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    const cityAndCountry = extractAddress(place);
    const parsedAddress = cityAndCountry
      ? cityAndCountry.city + cityAndCountry.country
      : '';
    onChangeHandler(parsedAddress, id);
  };

  useEffect(() => {
    // init autocomplete
    const initAutocomplete = () => {
      if (!searchInput.current) return false;
      const autocomplete = new window.google.maps.places.Autocomplete(
        searchInput.current,
        {
          types: ['(cities)'],
          fields: ['name'],
        },
      );
      autocomplete.setFields(['name']);
      autocomplete.addListener('place_changed', () =>
        onChangeAddress(autocomplete),
      );
      return true;
    };
    initAutocomplete();
  });

  useEffect(() => {
    const { search } = history.location;
    const city = extractCityFromURL(search);
    setAddress(city);
  }, [history.location]);

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor="search-city">City</InputLabel>
      <FilledInput
        inputComponent="input"
        value={address}
        onChange={(e) => onChangeHandler(e.target.value, id)}
        inputRef={searchInput}
        placeholder="type something"
        id="search-city"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="search"
              onClick={() => onChangeHandler(address, id)}
              edge="end"
            >
              <Search />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
});

export default SearchInput;
