import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, BadRequestException, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('reservations')
@UseGuards(JwtAuthGuard)
@ApiTags('reservation')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll(@Query('startTime') startTime: Date, @Query('endTime') endTime: Date, @Query('officeId') officeId: number): Promise<any> {
    if(new Date(startTime) > new Date(endTime)) {
      throw new BadRequestException('Start time must be before end time');
    }

    if(officeId) {
      return this.reservationsService.find(officeId, startTime, endTime);
    }
    return this.reservationsService.findAll(startTime, endTime);
  }

  @Post()
  create(@Request() req, @Body() createReservationDto: CreateReservationDto) {
    this.reservationsService.create(createReservationDto, req.user.id);
  }

  @Delete("/:id")
    delete(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.delete(id);
  }
}
