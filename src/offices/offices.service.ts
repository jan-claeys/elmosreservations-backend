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
    return this.officeRepository.query("select * from getoffices($1, $2)", [new Date(), new Date()]);
  }

  findOne(id: number): Promise<Office> {
    return this.officeRepository.query("select * from getoffices($1, $2) where id = $3", [new Date(), new Date(),id]);
  }
}