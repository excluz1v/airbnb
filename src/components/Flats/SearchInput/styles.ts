import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      position: 'sticky',
      top: '5rem',
      zIndex: 2,
    },
  }),
);

export default useStyles;
