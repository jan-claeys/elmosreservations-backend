import { Controller, Get } from '@nestjs/common';
import { UsersService } from './Users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}