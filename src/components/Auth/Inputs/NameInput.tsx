import React from 'react';
import { FormControl, FormHelperText, TextField } from '@mui/material';

type Tprops = {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  touched: boolean | undefined;
  errors: string | undefined;
};

function NameInput(props: Tprops): JSX.Element {
  const { value, onChange, touched, errors } = props;
  return (
    <FormControl fullWidth error>
      <TextField
        fullWidth
        name="name"
        type="text"
        onChange={onChange}
        value={value}
        variant="filled"
        label="Full Name"
        size="small"
        aria-describedby="fullname-error-text"
      />
      {errors && touched && (
        <FormHelperText id="fullname-error-text">{errors}</FormHelperText>
      )}
    </FormControl>
  );
}

export default NameInput;
