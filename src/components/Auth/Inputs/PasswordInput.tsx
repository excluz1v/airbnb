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
  label: string;
  name: string;
};

function PasswordInput(props: Tprops): JSX.Element {
  const { value, onChange, touched, errors, label, name } = props;
  console.log(errors);
  const id = `${name}-error-text`;
  const [showPass, setShowPass] = useState(false);
  const handleTogglePassword = () => {
    setShowPass(!showPass);
  };
  return (
    <FormControl fullWidth error>
      <TextField
        name={name}
        type={showPass ? 'text' : 'password'}
        onChange={onChange}
        value={value}
        variant="filled"
        label={label}
        size="small"
        aria-describedby={id}
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
      {errors && touched && <FormHelperText id={id}>{errors}</FormHelperText>}
    </FormControl>
  );
}

export default PasswordInput;
