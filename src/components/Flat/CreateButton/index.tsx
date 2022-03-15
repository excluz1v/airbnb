import { Button } from '@mui/material';
import React from 'react';
import { Add } from '@mui/icons-material';
import useStyles from './styles';

function CreateButton() {
  const classes = useStyles();
  return (
    <Button color="secondary" className={classes.button} variant="contained">
      <Add />
      add flat
    </Button>
  );
}

export default CreateButton;
