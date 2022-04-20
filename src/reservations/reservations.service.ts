import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Office } from '../offices/office.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservation.entity';
import { OfficesService } from 'src/offices/offices.service';
import { UsersService } from 'src/users/users.service';
import { start } from 'repl';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly officeService: OfficesService,
    private readonly userService: UsersService,
  ) { }

  async create(createReservationDto: CreateReservationDto) {

   /*  let reservation: Reservation= this.reservationRepository.create(createReservationDto);

    reservation.office = await this.officeService.findOne(createReservationDto.officeId);
    reservation.user = await this.userService.findOne(createReservationDto.userId);

    console.log(reservation);
    
    this.reservationRepository.save(reservation); */
  }

  async find(officeId: number, startTime: Date, endTime: Date) {
    let reservations: Reservation[] = await this.findAll(startTime, endTime);
    let office: Office = await this.officeService.findOne(officeId, startTime, endTime);

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
        return !(reservation.start_time > startTime && reservation.end_time > endTime
          || reservation.end_time < startTime && reservation.end_time < endTime)
      });
  }

  delete(id: number) {
    this.reservationRepository.delete(id);
  }
}
