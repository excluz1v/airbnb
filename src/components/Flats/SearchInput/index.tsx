import { Search } from '@mui/icons-material';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';

function loadAsyncScript(url: string) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    Object.assign(script, {
      type: 'text/javascript',
      async: true,
      src: url,
    });
    script.addEventListener('load', () => resolve(script));
    document.head.appendChild(script);
  });
}

const initMapScript = () => {
  // if script already loaded
  const properties = Object.getOwnPropertyNames(window);
  if (properties.includes('google')) {
    return Promise.resolve();
  }
  const src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&language=en&libraries=places`;
  return loadAsyncScript(src);
};

const extractAddress = (place: google.maps.places.PlaceResult) => {
  const address = {
    city: '',
    country: '',
    plain() {
      const city = this.city ? `${this.city}, ` : '';
      return city + this.country;
    },
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const { types } = component;
    const value = component.long_name;

    if (types.includes('locality')) {
      address.city = value;
    }

    if (types.includes('country')) {
      address.country = value;
    }
  });
  return address;
};

type Tprops = {
  onChange: (s: string, id: string | undefined) => void;
  value: string;
  id: string | undefined;
};

function SearchInput(props: Tprops): JSX.Element {
  const { value, onChange, id } = props;

  const searchInput = useRef<HTMLInputElement>(null);

  // do something on address change
  const onChangeAddress = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    const cityAndCountry = extractAddress(place).plain();
    onChange(cityAndCountry, id);
  };

  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    onChange(e.target.value, id);
  }
  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return false;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current,
    );
    autocomplete.setFields(['address_component', 'geometry']);
    autocomplete.addListener('place_changed', () =>
      onChangeAddress(autocomplete),
    );
    return true;
  };

  useEffect(() => {
    initMapScript().then(() => {
      initAutocomplete();
    });
  });

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor="search-city">City</InputLabel>
      <FilledInput
        inputComponent="input"
        value={value}
        onChange={(e) => onChangeHandler(e)}
        inputRef={searchInput}
        placeholder="type something"
        id="search-city"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="search"
              onClick={() => onChange(value, id)}
              edge="end"
            >
              <Search />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default SearchInput;
