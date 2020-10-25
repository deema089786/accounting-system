import { useState, useEffect, useCallback } from 'react';
import * as api from '../../services/api';
import { API } from '../../types';

const testSeed: API.Transaction[] = [
  { type: 'credit', amount: 10 },
  { type: 'debit', amount: 10 },
  { type: 'debit', amount: 100 },
  { type: 'credit', amount: 120 },
  { type: 'credit', amount: 200 },
  { type: 'debit', amount: 150 },
  { type: 'credit', amount: 50 },
];

export interface UseAccountHook {
  transactions: API.TransactionRecord[];
  balance: number | null;
  fetchAccount(params?: { loading?: boolean }): Promise<void>;
  handleTransaction(transaction: API.Transaction, throwError?: boolean): Promise<void>;
  testAPI(): Promise<void>;
  reset(): Promise<void>;
  loading: boolean;
}

const useAccount = (): UseAccountHook => {
  const [transactions, setTransactions] = useState<API.TransactionRecord[]>([]);
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAccount = useCallback<UseAccountHook['fetchAccount']>(async ({ loading = true } = {}) => {
    try {
      if (loading) {
        setLoading(true);
      }
      const { data } = await api.accounts.getAccount();
      setTransactions(data.transactions.reverse());
      setBalance(data.balance);
    } catch (e) {
      console.error(e);
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchAccount().catch(e => console.error(e));
    const intervalId = setInterval(() => fetchAccount({ loading: false }), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleTransaction: UseAccountHook['handleTransaction'] = async (transaction, throwError = false) => {
    try {
      setLoading(true);
      const { data } = await api.accounts.createTransaction(transaction);
      setTransactions([data, ...transactions]);
    } catch (e) {
      console.error(e);
      if (throwError) {
        throw e;
      }
    } finally {
      setLoading(false);
    }
  };

  const testAPI: UseAccountHook['testAPI'] = async () => {
    try {
      setLoading(true);
      await Promise.all(testSeed.map(item => api.accounts.createTransaction(item)));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const reset: UseAccountHook['reset'] = async () => {
    try {
      setLoading(true);
      await api.accounts.reset();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return {
    transactions,
    balance,
    fetchAccount,
    handleTransaction,
    loading,
    testAPI,
    reset,
  };
};

export default useAccount;
