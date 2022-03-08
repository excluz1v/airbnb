import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from '@mui/styles';
import Hero_image from '../../../assets/Hero_image.png';
import Registration from '..';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  }),
);

const SignUpScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.container}>
        <Container>
          <Grid container>
            <Grid item xs={6}>
              <img className={classes.image} src={Hero_image} alt="login" />
            </Grid>
            <Grid item xs={6} p={3} pb={0}>
              <Registration />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default SignUpScreen;
