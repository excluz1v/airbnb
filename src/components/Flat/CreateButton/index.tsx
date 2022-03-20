import { Button } from '@mui/material';
import React from 'react';
import { Add } from '@mui/icons-material';
import useStyles from './styles';

type Tprops = {
  onclick: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateButton(props: Tprops) {
  const { onclick } = props;
  const classes = useStyles();

  function onerBackDrop() {
    onclick(true);
  }
  return (
    <Button
      startIcon={<Add />}
      color="secondary"
      className={classes.button}
      variant="contained"
      onClick={onerBackDrop}
    >
      add flat
    </Button>
  );
}

export default CreateButton;
