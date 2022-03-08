import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      maxWidth: '375px',
      margin: '0 auto',
      flexWrap: 'nowrap',
    },
  }),
);

export default useStyles;
