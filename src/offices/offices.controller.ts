import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Office } from './Office.entity';
import { OfficesService } from './offices.service';

@Controller('offices')
@ApiTags('office')
export class OfficesController {
  constructor(private readonly officService: OfficesService) {}

  @ApiQuery({
    name: "startTime",
    type: Date,
    required: false
  })

  @ApiQuery({
    name: "endTime",
    type: Date,
    required: false
  })

   @Get()
    getAll(@Query("startTime")startTime: Date, @Query("endTime")endTime: Date): Promise<Office[]> { 
        return this.officService.findAll(startTime, endTime);
    }
}