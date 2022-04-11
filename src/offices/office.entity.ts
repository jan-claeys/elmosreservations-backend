import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Office {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    places: number
}