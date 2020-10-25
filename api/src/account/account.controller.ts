import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { Transaction, TransactionRecord } from '../types';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('')
  getAccount(): { transactions: TransactionRecord[]; balance: number } {
    return this.accountService.getAccount();
  }

  @Get('reset')
  reset(): void {
    return this.accountService.reset();
  }

  @Post('transactions')
  createTransaction(
    @Body() { transaction }: { transaction: Transaction },
  ): Promise<TransactionRecord> {
    return this.accountService.createTransaction(transaction);
  }
}
