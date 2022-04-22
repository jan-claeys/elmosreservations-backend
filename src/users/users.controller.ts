import { BadRequestException, Body, Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.checkIfEmailExists(createUserDto.email)) {
      throw new BadRequestException("There is already a user with this email");
    }
    
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    this.userService.create(createUserDto);
  }

  private async checkIfEmailExists(email: string) {
    return (await this.userService.findAll()).filter(user => user.email === email).length > 0;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@Request() req) {
    return this.userService.findOne(req.user.id);
  }
}