import { Grid, Typography } from '@mui/material';
import React from 'react';
import Logo from '../Unknown/Logo/Logo';
import ScreenToggler from '../Unknown/ScreenToggler';
import RegForm from './RegistrForm';

const Registration: React.FC = () => {
  return (
    <Grid container spacing={5} pt={3} pb={3} maxWidth="375px" margin="0 auto">
      <Grid justifyContent="center" item xs={12}>
        <Logo />
      </Grid>
      <Grid textAlign="center" item xs={12}>
        <Typography variant="h2" fontWeight="bold">
          Register
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RegForm />
      </Grid>
      <Grid item xs={12}>
        <ScreenToggler
          description="Already have account?"
          linkText="login"
          linkTo="/login"
        />
      </Grid>
    </Grid>
  );
};

export default Registration;
