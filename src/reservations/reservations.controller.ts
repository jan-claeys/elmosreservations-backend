import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode, BadRequestException, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OfficesService } from 'src/offices/offices.service';
import { Reservation } from './reservation.entity';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
@ApiTags('reservation')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly officeService: OfficesService,
  ) { }

  @Get()
  findAll(@Query('startTime') startTime: Date, @Query('endTime') endTime: Date, @Query('officeId') officeId: number): Promise<any> {
    if (new Date(startTime) > new Date(endTime)) {
      throw new BadRequestException('Start time must be before end time');
    }

    if (officeId) {
      return this.reservationsService.find(officeId, startTime, endTime);
    }
    return this.reservationsService.findAll(startTime, endTime);
  }

  @Post()
  async create(@Request() req, @Body() createReservationDto: CreateReservationDto) {
    if (new Date(createReservationDto.startTime) > new Date(createReservationDto.endTime)) {
      throw new BadRequestException('Start time must be before end time');
    }

    const office = await this.officeService.findOne(createReservationDto.officeId, createReservationDto.startTime, createReservationDto.endTime);
    const officeEmptyPlaces = office.empty_places;
    
    if (officeEmptyPlaces <= 0) {
      throw new BadRequestException('office is full');
    }
    this.reservationsService.create(createReservationDto, req.user.id);
  }

  @Delete("/:id")
  async delete(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const reservations: Reservation[] = await this.reservationsService.findAllUser(req.user.id);
    
    if(!reservations.find(reservation => reservation.id == id)) {
      throw new BadRequestException('You can not delete this reservation');
    }
    
    return this.reservationsService.delete(id);
  }
}
