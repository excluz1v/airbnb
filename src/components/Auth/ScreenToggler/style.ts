import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
  }),
);

export default useStyles;
