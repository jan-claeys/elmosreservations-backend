import { Type } from 'class-transformer';
import {IsDate, IsNotEmpty, IsNumber, MinDate } from 'class-validator';

export class CreateReservationDto {
    @IsNotEmpty()
    @IsNumber()
    officeId: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    start_date: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    end_date: Date;
}
