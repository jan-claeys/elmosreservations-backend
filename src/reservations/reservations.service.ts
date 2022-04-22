import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from '../offices/office.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservation.entity';
import { OfficesService } from 'src/offices/offices.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly officeService: OfficesService
  ) {}

  create(createReservationDto: CreateReservationDto, userId: number): Promise<Reservation> {
    return this.reservationRepository.query('insert into reservation (start_time, end_time, "officeId", "userId") values ($1, $2, $3, $4)', [createReservationDto.startTime, createReservationDto.endTime, createReservationDto.officeId, userId]);
  }

  async find(officeId: number, startTime: Date, endTime: Date) {
    let reservations: Reservation[] = await this.findAll(startTime, endTime);

    let office: Office = await this.officeService.findOne(officeId, startTime, endTime);

    reservations = reservations.filter(reservation => reservation.office.id == officeId);
    reservations.forEach(reservation => delete reservation.office);

    const res = {
      reservations: reservations,
      office: office
    }

    return res;
  }

  async findAll(startTime: Date, endTime: Date): Promise<Reservation[]> {
    let res: Reservation[] = await this.reservationRepository.find();
    return res.filter(reservation => {
          return (new Date(startTime) <= new Date(reservation.end_time)) && (new Date(reservation.start_time) <= new Date(endTime));
      });
  }

  findAllUser(userId: number): Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { user: userId } });
  }

  delete(id: number) {
    this.reservationRepository.delete(id);
  }
}
