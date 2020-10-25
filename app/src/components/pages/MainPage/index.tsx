import React from 'react';
import { Typography, Button, List, CircularProgress, Grid } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import Layout from '../../layout';
import UserComponent from './UserComponent';
import TransactionRecord from './TransactionRecord';
import { useAccount } from '../../../data-hooks/account';
import useStyles from './styles';

const MainPage: React.FC = () => {
  const classes = useStyles();
  const { transactions, handleTransaction, fetchAccount, balance, testAPI, reset, loading } = useAccount();
  return (
    <Layout>
      <Typography>Accounting system</Typography>
      <UserComponent handleTransaction={handleTransaction} balance={balance} />
      <Grid container>
        <Grid item xs={3} className={classes.gridItem}>
          <Button variant="outlined" color="primary" onClick={() => fetchAccount()}>
            Refresh history
          </Button>
        </Grid>
        <Grid item xs={3} className={classes.gridItem}>
          <Button variant="outlined" color="primary" onClick={() => testAPI()}>
            Test API
          </Button>
        </Grid>
        <Grid item xs={3} className={classes.gridItem}>
          <Button variant="outlined" color="primary" onClick={() => reset()}>
            Reset
          </Button>
        </Grid>
        <Grid item xs={3} className={classes.gridItem}>
          {loading ? <CircularProgress /> : <Check />}
        </Grid>
      </Grid>

      <List>
        {transactions.map(record => (
          <TransactionRecord record={record} key={record.id} />
        ))}
      </List>
    </Layout>
  );
};
export default MainPage;
