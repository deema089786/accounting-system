import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
  listItem: {
    '&.success': {
      backgroundColor: 'rgba(83,255,0,0.3)',
    },
    '&.error': {
      backgroundColor: 'rgba(255,0,0, 0.3)',
    },
    '&.canceled': {
      backgroundColor: 'rgb(118,118,118, 0.3)',
    },
  },
}));
