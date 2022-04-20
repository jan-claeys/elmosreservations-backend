import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';

@Injectable()
export class CompaniesService {

  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  
  findAll() {
    return this.companyRepository.find();
  }
}
