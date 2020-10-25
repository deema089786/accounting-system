import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(): User {
    return this.userService.getUser();
  }
}
