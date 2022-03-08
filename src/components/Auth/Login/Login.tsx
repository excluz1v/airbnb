import { Grid, Typography } from '@mui/material';
import React from 'react';
import useStyles from './style';
import Logo from '../../Unknown/Logo/Logo';
import ScreenToggler from '../../Unknown/ScreenToggler';
import LoginForm from '../LoginForm/LoginForm';

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={5}
      pt={3}
      pb={3}
      height="100%"
    >
      <Grid justifyContent="center" item xs={12}>
        <Logo />
      </Grid>
      <Grid justifyContent="center" item xs={12}>
        <Typography variant="h2" textAlign="center">
          Login
        </Typography>
      </Grid>

      <Grid justifyContent="center" item xs={12}>
        <LoginForm />
      </Grid>
      <Grid justifyContent="center" item xs={12}>
        <ScreenToggler
          description="Don’t have an account?"
          linkText="register"
          linkTo="/register"
        />
      </Grid>
    </Grid>
  );
};

export default Login;
