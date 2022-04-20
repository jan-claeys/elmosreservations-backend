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
    start_time: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    end_time: Date;
}
