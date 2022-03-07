import {
  AppBar,
  Avatar,
  IconButton,
  MenuItem,
  Toolbar,
  Typography,
  Menu,
  Button,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import React, { useContext } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useUser, useFirebaseApp } from 'reactfire';
import clearFirestoreCache from '../../../../common/clearFirestoreCache';
import { UIContext } from '../../UIContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menu: {
      backgroundColor: theme.palette.secondary.main,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const HomeMenu: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const classes = useStyles();
  const user = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const auth = useFirebaseApp().auth();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  async function logout() {
    handleClose();
    try {
      await auth.signOut();
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      setAlert({ severity: 'error', message, show: true });
    }
    clearFirestoreCache();
  }

  function extractInitials(fullName: string) {
    const arr = fullName.split(' ');
    return arr[0][0] + arr[1][0];
  }
  const initials = user.data.displayName
    ? extractInitials(user.data.displayName)
    : 'U';

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.menu}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Voypost
          </Typography>
          <Button onClick={handleClick}>
            <Avatar>{initials}</Avatar>
          </Button>

          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}> Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HomeMenu;
