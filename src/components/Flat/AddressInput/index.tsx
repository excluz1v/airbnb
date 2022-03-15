import { TextField } from '@mui/material';
import { useField } from 'formik';
import React, { useCallback } from 'react';

type Tprops = {
  name: string;
};

function AddressInput(props: Tprops) {
  const { name } = props;
  const [field, meta, helpers] = useField(name);
  const { error } = meta;

  const onRefChange = useCallback(
    (node: HTMLInputElement) => {
      if (node) {
        // init autocomplete
        const initAutocomplete = () => {
          if (!node) return false;
          const autocomplete = new window.google.maps.places.Autocomplete(
            node,
            {
              types: ['address'],
              fields: ['name'],
            },
          );
          const onChangeAddress = (
            autocomplet: google.maps.places.Autocomplete,
          ) => {
            const place = autocomplet.getPlace();
            if (place.name) {
              helpers.setValue(place.name);
            }
          };
          autocomplete.setFields(['name']);
          autocomplete.addListener('place_changed', () =>
            onChangeAddress(autocomplete),
          );
          return true;
        };
        initAutocomplete();
      }
    },
    [helpers],
  );

  return (
    <TextField
      type="text"
      {...field}
      variant="standard"
      label="Address"
      size="small"
      aria-describedby="address-error-text"
      error={!!error}
      helperText={error}
      inputRef={onRefChange}
    />
  );
}

export default AddressInput;
