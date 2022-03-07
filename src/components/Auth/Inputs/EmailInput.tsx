import React from 'react';
import { FormControl, FormHelperText, TextField } from '@mui/material';

type Tprops = {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  touched: boolean | undefined;
  errors: string | undefined;
};

function EmailInput(props: Tprops): JSX.Element {
  const { value, onChange, touched, errors } = props;
  return (
    <FormControl fullWidth error>
      <TextField
        name="email"
        type="email"
        onChange={onChange}
        value={value}
        variant="filled"
        label="Email"
        size="small"
        aria-describedby="email-error-text"
      />
      {errors && touched && (
        <FormHelperText id="email-error-text">{errors}</FormHelperText>
      )}
    </FormControl>
  );
}

export default EmailInput;
