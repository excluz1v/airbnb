import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

type Tprops = {
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  touched: boolean | undefined;
  errors: string | undefined;
};

function PasswordInput(props: Tprops): JSX.Element {
  const { value, onChange, touched, errors } = props;

  const [showPass, setShowPass] = useState(false);
  const handleTogglePassword = () => {
    setShowPass(!showPass);
  };
  return (
    <FormControl fullWidth error>
      <TextField
        name="password"
        type={showPass ? 'text' : 'password'}
        onChange={onChange}
        value={value}
        variant="filled"
        label="Password"
        size="small"
        aria-describedby="password-error-text"
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
      {errors && touched && (
        <FormHelperText id="password-error-text">{errors}</FormHelperText>
      )}
    </FormControl>
  );
}

export default PasswordInput;
