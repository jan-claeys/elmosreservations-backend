import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Office } from './Office.entity';
import { OfficesService } from './offices.service';

@Controller('offices')
@ApiTags('office')
export class OfficesController {
  constructor(private readonly officService: OfficesService) {}

   @Get()
    getAll(@Query("startTime")startTime: Date, @Query("endTime")endTime: Date): Promise<Office[]> { 
        return this.officService.findAll(startTime, endTime);
    }
}