import React from 'react';
import classNames from 'classnames';
import { ListItemText, ListItem } from '@material-ui/core';
import { API } from '../../../../types';
import useStyles from './styles';

interface Props {
  record: API.TransactionRecord;
}

const TransactionRecord: React.FC<Props> = (props: Props) => {
  const { record } = props;
  const classes = useStyles();

  return (
    <ListItem className={classNames(classes.listItem, record.status)}>
      <ListItemText
        primary={`${record.transaction.type.toUpperCase()}: ${record.transaction.amount} credits`}
        secondary={`${record.status} | ${new Date(record.createdAt).toLocaleDateString()} | Balance: ${
          record.balance
        } credits`}
      />
    </ListItem>
  );
};
export default TransactionRecord;
