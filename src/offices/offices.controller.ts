import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Office } from './Office.entity';
import { OfficesService } from './offices.service';

@Controller('offices')
@ApiTags('office')
export class OfficesController {
  constructor(private readonly officService: OfficesService) {}

   @Get()
    getAll(): Promise<Office[]> {
        return this.officService.findAll();
    }
}