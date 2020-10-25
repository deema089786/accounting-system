import { Injectable } from '@nestjs/common';
import { seedUser } from './seed';
import { User } from '../types';

@Injectable()
export class UserService {
  user: User = seedUser;

  getUser(): User {
    return this.user;
  }
}
