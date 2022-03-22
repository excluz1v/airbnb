import { makeStyles } from '@mui/styles';
import { MAX_LINES_AT_DECRIPTION } from '../../../common/constants';

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

export default useStyles;
