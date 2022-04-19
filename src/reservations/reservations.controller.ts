import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reservations')
@ApiTags('reservation')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll(@Query('officeId') officeId: number): Promise<any> {
    if(officeId) {
      return this.reservationsService.find(officeId);
    }
    return this.reservationsService.findAll();
  }

  
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Delete("/:id")
    delete(@Param('id') id: number) {
    return this.reservationsService.delete(id);
  }
}
