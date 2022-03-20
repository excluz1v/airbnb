import { createStyles, makeStyles } from '@mui/styles';
import defaultTheme from '../../../common/theme';

const useStyles = makeStyles((theme: typeof defaultTheme) =>
  createStyles({
    button: {
      position: 'absolute',
      bottom: '10%',
      right: 35,
      zIndex: theme.zIndex.drawer,
      borderRadius: 30,
    },
  }),
);

export default useStyles;
