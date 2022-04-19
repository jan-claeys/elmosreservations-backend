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
    private readonly officeService: OfficesService,
    private readonly userService: UsersService,
  ) { }

  async create(createReservationDto: CreateReservationDto) {

    let reservation: Reservation= this.reservationRepository.create(createReservationDto);

    reservation.office = await this.officeService.findOne(createReservationDto.officeId);
    reservation.user = await this.userService.findOne(createReservationDto.userId);

    console.log(reservation);
    
    this.reservationRepository.save(reservation);
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

  delete(id: number) {
    this.reservationRepository.delete(id);
  }
}
