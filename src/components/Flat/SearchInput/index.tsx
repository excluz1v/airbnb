import { Search } from '@mui/icons-material';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const extractAddress = (place: google.maps.places.PlaceResult) => {
  const address = {
    city: '',
    country: '',
  };
  if (place.name) {
    const cityWIthCountry = place.name.split(',');
    const [parsedSCity, parsedCountry] = cityWIthCountry;
    address.city = parsedSCity;
    address.country = parsedCountry;
    return address;
  }
  return null;
};

type Tprops = {
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

type TParams = {
  id: string | undefined;
};

const SearchInput = React.memo(function SearchInput(
  props: Tprops,
): JSX.Element {
  const { value, setAddress } = props;
  const { id } = useParams<TParams>();
  const searchInput = useRef<HTMLInputElement>(null);
  const history = useHistory();

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
          fields: ['political'],
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

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor="search-city">City</InputLabel>
      <FilledInput
        inputComponent="input"
        value={value}
        onChange={(e) => onChangeHandler(e.target.value, id)}
        inputRef={searchInput}
        placeholder="type something"
        id="search-city"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="search"
              onClick={() => onChangeHandler(value, id)}
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
