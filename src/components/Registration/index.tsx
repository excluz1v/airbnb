import { Grid, Typography } from '@mui/material';
import React from 'react';
import Logo from '../Unknown/Logo/Logo';
import ScreenToggler from '../Unknown/ScreenToggler';
import RegForm from './RegistrForm';
import useStyles from './style';

const Registration: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.wrapper} spacing={5} pt={3} pb={3}>
      <Grid justifyContent="center" item xs={12}>
        <Logo />
      </Grid>
      <Grid textAlign="center" item xs={12}>
        <Typography variant="h2">Register</Typography>
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
