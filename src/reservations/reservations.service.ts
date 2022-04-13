import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from '../offices/office.entity';
import { DataTypeNotSupportedError, Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './reservation.entity';
import { OfficesService } from 'src/offices/offices.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>, private readonly officeService: OfficesService
  ) { }

  create(createReservationDto: CreateReservationDto) {
    console.log(createReservationDto);

    this.reservationRepository.createQueryBuilder()
      .insert()
      .into(Reservation)
      .values([createReservationDto])
      .execute();
  }

  async find(officeId: number) {
    let reservations: Reservation[] = await this.findAll();
    let office: Office = await this.officeService.findOne(officeId);

    reservations.forEach(reservation => delete reservation.office);

    const res = {
      reservations: reservations,
      office: office
    }

    return res;
  }

  async findAll(): Promise<Reservation[]> {
    let res: Reservation[] = await this.reservationRepository.find();
    return res.filter(reservation => {
       return new Date(reservation.end_date) > new Date() 
      });
  }
}
