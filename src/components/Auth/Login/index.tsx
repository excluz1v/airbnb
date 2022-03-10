import { Grid, Typography } from '@mui/material';
import React from 'react';
import Logo from '../../Unknown/Logo';
import ScreenToggler from '../../Unknown/ScreenToggler';
import LoginForm from '../LoginForm/LoginForm';

const Login: React.FC = () => {
  return (
    <>
      <Grid justifyContent="center" item xs={12}>
        <Logo />
      </Grid>
      <Grid justifyContent="center" item xs={12}>
        <Typography variant="h2" fontWeight="bold" textAlign="center">
          Login
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LoginForm />
      </Grid>
      <Grid item xs={12}>
        <ScreenToggler
          description="Don’t have an account?"
          linkText="register"
          linkTo="/register"
        />
      </Grid>
    </>
  );
};

export default Login;
