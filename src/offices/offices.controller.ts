import { Controller, Get } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Office } from './Office.entity';
import { OfficesService } from './offices.service';

@Controller('offices')
export class OfficesController {
  constructor(private readonly officService: OfficesService) {}

   @Get()
    getAll(): Promise<Office[]> {
        return this.officService.findAll();
    }
}