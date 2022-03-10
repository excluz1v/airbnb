import React, { useEffect, useRef, useState } from 'react';

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

function SearchInput() {
  const searchInput = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState('');
  // do something on address change
  const onChangeAddress = (autocomplete: google.maps.places.Autocomplete) => {
    const place = autocomplete.getPlace();
    const cityAndCountry = extractAddress(place);
    setAddress(cityAndCountry.plain());
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

  const initMapScript = () => {
    // if script already loaded
    const properties = Object.getOwnPropertyNames(window);
    if (properties.includes('google')) {
      return Promise.resolve();
    }
    const src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&language=en&libraries=places`;
    return loadAsyncScript(src);
  };

  useEffect(() => {
    initMapScript().then(() => {
      initAutocomplete();
    });
  });

  return <input ref={searchInput} placeholder="type something" />;
}

export default SearchInput;
