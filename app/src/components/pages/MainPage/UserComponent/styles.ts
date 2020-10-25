import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  root: {
    minWidth: 275,
  },
  rootLoading: {
    minWidth: 275,
    minHeight: 275,
    display: 'flex',
    alightItems: 'center',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));
