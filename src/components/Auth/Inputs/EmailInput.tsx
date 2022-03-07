import React from 'react';
import { TextField } from '@mui/material';

type Tprops = {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  touched: boolean | undefined;
  errors: string | undefined;
};

function EmailInput(props: Tprops) {
  const { value, onChange, touched, errors } = props;
  return (
    <>
      <TextField
        fullWidth
        name="email"
        type="email"
        onChange={onChange}
        value={value}
        variant="filled"
        label="Email"
        size="small"
      />
      {errors && touched ? <div>{errors}</div> : null}
    </>
  );
}

export default EmailInput;
