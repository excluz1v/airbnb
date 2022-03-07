import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      maxWidth: '375px',
      margin: '0 auto',
      rowGap: '3rem',
    },
  }),
);

export default useStyles;
