import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Flat } from '../../../../types';
import useStyles from './styles';

type Tprop = Flat & {
  isSelected: boolean;
  cityFromUrl: string | null;
};

function FlatCard(props: Tprop): JSX.Element {
  const {
    cityName,
    photoUrl,
    description,
    id,
    isSelected,
    dailyPriceUsd,
    cityFromUrl,
  } = props;
  const classes = useStyles();

  return (
    <Card raised={isSelected} className={classes.root}>
      <CardMedia
        className={classes.media}
        image={photoUrl}
        title="Contemplative Reptile"
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom component="h2">
          ${dailyPriceUsd} /night
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {cityName}
        </Typography>
        <Typography
          className={classes.description}
          color="textSecondary"
          component="p"
        >
          {description || ' '}
        </Typography>

        <Link
          className={classes.link}
          to={{
            pathname: `/flats/${id}`,
            search: cityFromUrl ? `?city=${cityFromUrl}` : '',
          }}
        >
          <Button size="small" color="secondary" variant="contained">
            Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default FlatCard;
