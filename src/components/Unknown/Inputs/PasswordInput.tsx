import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';

type Tprops = {
  value: string;
  onChange: (e: React.ChangeEvent) => void;

  errors: string | undefined;
  label: string;
  name: string;
};

function PasswordInput(props: Tprops): JSX.Element {
  const { value, onChange, errors, label, name } = props;

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
        error={!!errors}
        helperText={errors}
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
    </FormControl>
  );
}

export default PasswordInput;
