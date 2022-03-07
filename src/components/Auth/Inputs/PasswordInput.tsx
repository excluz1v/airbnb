import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

type Tprops = {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  touched: boolean | undefined;
  errors: string | undefined;
};

function PasswordInput(props: Tprops) {
  const { value, onChange, touched, errors } = props;

  const [showPass, setShowPass] = useState(false);
  const handleTogglePassword = () => {
    setShowPass(!showPass);
  };
  return (
    <>
      <TextField
        fullWidth
        name="password"
        type={showPass ? 'text' : 'password'}
        onChange={onChange}
        value={value}
        variant="filled"
        label="Password"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePassword}
                edge="end"
              >
                {!showPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {errors && touched ? <div>{errors}</div> : null}
    </>
  );
}

export default PasswordInput;
