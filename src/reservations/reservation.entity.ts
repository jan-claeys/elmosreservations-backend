import { Office } from '../offices/office.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ViewEntity, ViewColumn} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    start_time: Date;
    
    @Column()
    end_time: Date;

    @ManyToOne(type => Office, office => office.reservations, {eager: true})
    office: Office;

    @ManyToOne(type => User, user => user.reservations, {eager: true})
    user: User;
}
