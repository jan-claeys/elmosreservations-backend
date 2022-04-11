import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './Office.entity';

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(Office)
    private usersRepository: Repository<Office>,
  ) {}

  findAll(): Promise<Office[]> {
    return this.usersRepository.find();
  }
}