import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './Office.entity';

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(Office)
    private officeRepository: Repository<Office>,
  ) {}

  findAll(): Promise<Office[]> {
    return this.officeRepository.query("select * from getoffices");
  }

  findOne(id: number): Promise<Office> {
    return this.officeRepository.query("select * from getoffices where id = $1", [id]);
  }
}