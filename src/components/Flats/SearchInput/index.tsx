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
    const cityAndCountry = extractAddress(place).plain();
    onChangeHandler(cityAndCountry, id);
  };
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
    (async function loadGoogleMap() {
      await initMapScript();
      initAutocomplete();
    })();
  });

  // useEffect(() => {
  //   if (cityFromUrl) setAddress(cityFromUrl);
  // }, [cityFromUrl, setAddress]);

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
