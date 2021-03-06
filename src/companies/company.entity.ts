import { Office } from "src/offices/office.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @OneToMany(type => Office, office => office.company, {eager: true})
    offices: Office[]
}
