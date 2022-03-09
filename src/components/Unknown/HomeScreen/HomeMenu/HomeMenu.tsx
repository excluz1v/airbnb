import { Box, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import MenuBar from '../../../MenuBar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  }),
);

const HomeMenu: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MenuBar />
      <Box pt={4} justifyContent="center" display="flex">
        <Button type="button" variant="contained" color="secondary">
          <Link className={classes.link} to="/flats">
            explore flats
          </Link>
        </Button>
      </Box>
    </div>
  );
};

export default HomeMenu;
