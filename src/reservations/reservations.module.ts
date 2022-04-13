import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './reservation.entity';
import { OfficesModule } from 'src/offices/offices.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), OfficesModule],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
