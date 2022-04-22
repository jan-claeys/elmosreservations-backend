import { Reservation } from '../reservations/reservation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ select: false })
  password: string;

  @OneToMany(type => Reservation, reservation => reservation.office)
  reservations: Reservation[];
}