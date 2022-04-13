import { Controller, Get, Query } from '@nestjs/common';
import { Reservation } from 'src/reservations/reservation.entity';
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