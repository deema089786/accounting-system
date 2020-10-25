import React from 'react';
import { Card, CardContent, Typography, CircularProgress, CardActions, Button } from '@material-ui/core';
import { useUser } from '../../../../data-hooks/users';
import { useModals } from '../../../../providers/modals';
import useStyles from './styles';
import { API } from '../../../../types';

interface Props {
  handleTransaction(transaction: API.Transaction, throwError: boolean): Promise<void>;
  balance: number | null;
}

const UserComponent: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { handleTransaction, balance } = props;
  const { user, loading } = useUser();
  const { openModal } = useModals();

  if (loading) {
    return (
      <Card className={classes.rootLoading} variant="outlined">
        <CircularProgress size={50} />
      </Card>
    );
  }

  if (user === null) {
    return <p>user not loaded</p>;
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          User
        </Typography>
        <Typography variant="h5" component="h2">
          {`${user.name}: ${balance || '-'} credits`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() =>
            openModal('CREATE_TRANSACTION', {
              handleTransaction: (transition: API.Transaction) => handleTransaction(transition, true),
            })
          }
        >
          Create transaction
        </Button>
      </CardActions>
    </Card>
  );
};
export default UserComponent;
