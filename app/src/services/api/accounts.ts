import fetch from './fetch';
import { API } from '../../types';

const getAccount = () => fetch<{ transactions: API.TransactionRecord[]; balance: number }>('/account');

const reset = () => fetch('/account/reset');

const createTransaction = (transaction: API.Transaction) =>
  fetch<API.TransactionRecord>('/account/transactions', { method: 'POST', data: { transaction } });

export default {
  getAccount,
  createTransaction,
  reset,
};
