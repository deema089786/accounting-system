import { Transaction } from '../../../api/src/types';

export namespace API {
  export interface User {
    id: string;
    name: string;
  }

  export type TransactionType = 'debit' | 'credit';

  export interface Transaction {
    type: TransactionType;
    amount: number;
  }

  export interface Account {
    balance: number;
    transactions: Transaction[];
  }

  export type TransactionRecordStatus = 'success' | 'error' | 'canceled';

  export interface TransactionRecord {
    id: string;
    transaction: Transaction;
    status: TransactionRecordStatus;
    createdAt: Date;
    balance: number;
  }
}
