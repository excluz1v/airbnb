import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from '@mui/styles';
import Registration from './Registration';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signIn: {
      padding: '3rem 3rem 0',
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
              <img
                className={classes.image}
                src="./Hero_image.png"
                alt="login img"
              />
            </Grid>
            <Grid item xs={6} className={classes.signIn}>
              <Registration />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
export default SignUpScreen;
