import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { MAX_LINES_AT_DECRIPTION } from '../../../common/constants';
import image from './image.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 580,
    display: 'flex',
    height: 240,
  },
  media: {
    height: '100%',
    width: '50%',
  },
  content: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  description: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    lineClamp: MAX_LINES_AT_DECRIPTION,
    WebkitBoxOrient: 'vertical',
  },
});

type Tprop = {
  description: string;
  cost: number;
  city: string;
};

function FlatCard(props: Tprop) {
  const { city, cost, description } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        title="Contemplative Reptile"
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2">
          ${cost} /night
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {city}
        </Typography>
        <Typography
          className={classes.description}
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
        <Button size="small" color="secondary" variant="contained">
          Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default FlatCard;
