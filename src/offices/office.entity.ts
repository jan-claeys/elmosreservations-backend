import { Company } from 'src/companies/company.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne  } from 'typeorm';

@Entity()
export class Office {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    places: number;

    @OneToMany(type => Reservation, reservation => reservation.office)
    reservations: Reservation[]

    @ManyToOne(type => Company, company => company.offices)
    company: Company;
}