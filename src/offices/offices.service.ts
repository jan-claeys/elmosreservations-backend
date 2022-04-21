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

  findAll(startTime, endTime): Promise<Office[]> {
    return this.officeRepository.query("select * from getoffices($1, $2)", [startTime, endTime]);
  }

  async findOne(id: number, startTime: Date, endTime: Date) {
    const res = await this.officeRepository.query("select * from getoffices($1, $2) where id = $3 limit 1", [startTime, endTime, id]);
    return res[0];
  }
}