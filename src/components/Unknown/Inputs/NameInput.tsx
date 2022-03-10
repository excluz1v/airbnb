import React from 'react';
import { FormControl, TextField } from '@mui/material';

type Tprops = {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  errors: string | undefined;
};

function NameInput(props: Tprops): JSX.Element {
  const { value, onChange, errors } = props;
  return (
    <FormControl fullWidth error>
      <TextField
        fullWidth
        name="fullName"
        type="text"
        onChange={onChange}
        value={value}
        variant="filled"
        label="Full Name"
        size="small"
        aria-describedby="fullname-error-text"
        error={!!errors}
        helperText={errors}
      />
    </FormControl>
  );
}

export default NameInput;
