import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/reservations/dto/create-reservation.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneEmail(email: string): Promise<User | undefined> {
    let users = await this.findAll();
    return users.filter(user => user.email === email)[0];
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }
}