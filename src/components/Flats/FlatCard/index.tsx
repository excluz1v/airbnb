import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { MAX_LINES_AT_DECRIPTION } from '../../../common/constants';
import image from './image.png';

type Tprop = {
  description: string | undefined;
  cost: number;
  city: string;
  id: string;
  isSelected: boolean;
};

const useStyles = makeStyles({
  root: {
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
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

function FlatCard(props: Tprop): JSX.Element {
  const { city, cost, description, id, isSelected } = props;
  const classes = useStyles();

  return (
    <Card raised={isSelected} className={classes.root}>
      <CardMedia
        className={classes.media}
        image={image}
        title="Contemplative Reptile"
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom component="h2">
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
          {description || ' '}
        </Typography>
        <Button size="small" color="secondary" variant="contained">
          <Link className={classes.link} to={`/flats/${id}`}>
            Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default FlatCard;
