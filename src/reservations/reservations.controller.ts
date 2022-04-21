import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reservations')
@ApiTags('reservation')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll(@Query('officeId', ParseIntPipe) officeId: number, @Query('startTime') startTime: Date, @Query('endTime') endTime: Date): Promise<any> {
    if(new Date(startTime) > new Date(endTime)) {
      throw new BadRequestException('Start time must be before end time');
    }

    if(officeId) {
      return this.reservationsService.find(officeId, startTime, endTime);
    }
    return this.reservationsService.findAll(startTime, endTime);
  }

  
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Delete("/:id")
    delete(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.delete(id);
  }
}
