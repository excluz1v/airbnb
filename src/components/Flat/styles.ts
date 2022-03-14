import { createStyles, makeStyles } from '@mui/styles';
import defaultTheme from '../../common/theme';

const useStyles = makeStyles((theme: typeof defaultTheme) =>
  createStyles({
    inputWrapper: {
      backgroundColor: '#fff',
      position: 'sticky',
      top: 0,
      paddingTop: 30,
      zIndex: theme.zIndex.appBar,
    },
  }),
);

export default useStyles;
