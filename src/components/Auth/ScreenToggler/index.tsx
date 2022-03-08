import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './style';

type Tprops = {
  description: string;
  linkText: string;
  linkTo: string;
};

function ScreenToggler(props: Tprops): JSX.Element {
  const { description, linkText, linkTo } = props;
  const classes = useStyles();

  return (
    <Box
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography pb={2} variant="h4">
        {description}
      </Typography>
      <Link className={classes.link} to={linkTo}>
        {linkText}
      </Link>
    </Box>
  );
}

export default ScreenToggler;
