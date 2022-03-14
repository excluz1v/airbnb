import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    input: {
      position: 'sticky',
      top: '5rem',
      zIndex: 2,
    },
  }),
);

export default useStyles;
