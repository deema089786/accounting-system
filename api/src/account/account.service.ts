import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import {
  Transaction,
  TransactionRecord,
  TransactionRecordStatus,
} from '../types';

@Injectable()
export class AccountService {
  private transactions: {
    cb: (record: TransactionRecord) => void;
    transaction: Transaction;
  }[] = [];
  private history: TransactionRecord[] = [];
  private inProgress = false;
  private balance = 150;

  getAccount(): { transactions: TransactionRecord[]; balance: number } {
    return { transactions: this.history, balance: this.balance };
  }

  createTransaction(transaction: Transaction): Promise<TransactionRecord> {
    return new Promise<TransactionRecord>(resolve => {
      this.transactions.push({ cb: resolve, transaction });
      if (this.inProgress === false) {
        this.proceedTransactions().catch(e => console.error(e));
      }
    });
  }

  private async proceedTransactions(): Promise<void> {
    this.inProgress = true;
    while (this.transactions.length > 0) {
      const { transaction, cb } = this.transactions.shift();
      try {
        await this.handleTransaction(transaction);
        const record: TransactionRecord = {
          id: uuidV4(),
          transaction,
          status: 'success',
          createdAt: new Date(),
          balance: this.balance,
        };
        this.history.push(record);
        cb(record);
      } catch (e) {
        console.error(e);
        console.error(
          'Transaction failed. All next transactions will be canceled',
        );
        const record: TransactionRecord = {
          id: uuidV4(),
          transaction,
          status: 'error',
          createdAt: new Date(),
          balance: this.balance,
        };
        this.history.push(record);
        cb(record);
        this.transactions.forEach(({ cb, transaction: t }) => {
          const record: TransactionRecord = {
            id: uuidV4(),
            transaction: t,
            status: 'canceled',
            createdAt: new Date(),
            balance: this.balance,
          };
          this.history.push(record);
          cb(record);
        });
        this.transactions = [];
      }
    }

    this.inProgress = false;
  }

  // function returns promise to prevent thread blocking and allow handling new incoming transactions
  private async handleTransaction(transaction: Transaction): Promise<void> {
    await new Promise(res => setTimeout(res, 1000)); // simulation fof transaction processing
    switch (transaction.type) {
      case 'credit': {
        if (this.balance - transaction.amount < 0) {
          throw new Error('Insufficient funds');
        }
        this.balance -= transaction.amount;
        return;
      }
      case 'debit': {
        this.balance += transaction.amount;
        return;
      }
      default: {
        throw new Error('Unknown transaction type');
      }
    }
  }
  reset(): void {
    this.balance = 150;
    this.transactions = [];
    this.history = [];
  }
}
