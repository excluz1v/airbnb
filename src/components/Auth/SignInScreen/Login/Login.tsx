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
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.wrapper}
      spacing={5}
    >
      <Grid justifyContent="center" item xs={12}>
        <Logo />
      </Grid>
      <Grid justifyContent="center" item xs={12}>
        <Typography variant="h2">Login</Typography>
      </Grid>

      <Grid justifyContent="center" item xs={12}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default Login;
