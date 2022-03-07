import { Grid, Typography } from '@mui/material';
import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import Logo from '../Logo/Logo';
import useStyles from './style';

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.wrapper}
    >
      <Logo />
      <Typography variant="h2">Login</Typography>
      <LoginForm />
    </Grid>
  );
};

export default Login;
