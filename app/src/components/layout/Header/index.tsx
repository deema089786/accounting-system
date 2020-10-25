import React from 'react';
import { IconButton, AppBar, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import useStyles from './styles';

const Header: React.FC = () => {
  const classes = useStyles({});

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Accounting system
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
