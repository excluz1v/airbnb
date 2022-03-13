import { Box } from '@mui/material';
import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import LoginForm from '../LoginForm/LoginForm';
import Logo from '../Logo/Logo';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: '2rem',
      maxWidth: '375px',
      margin: '0 auto',
      flexWrap: 'wrap',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '40px',
    },
  }),
);
const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Logo />
      <h2 className={classes.title}>Login</h2>
      <LoginForm />
    </Box>
  );
};

export default Login;
