import { Box, Container, Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import Hero_image from '../../../assets/Hero_image.png';

interface GuestLayoutProps {
  children: React.ReactElement;
}

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

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <img className={classes.image} src={Hero_image} alt="login" />
          </Grid>
          <Grid item xs={6} p={3} pb={0}>
            <Grid
              container
              spacing={5}
              pt={3}
              pb={3}
              height="100%"
              maxWidth="375px"
              margin="0 auto"
            >
              {children}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default GuestLayout;
