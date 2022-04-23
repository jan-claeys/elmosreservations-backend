import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {IsDate, IsNotEmpty, IsNumber, MinDate } from 'class-validator';

export class CreateReservationDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    officeId: number;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    startTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    @MinDate(new Date())
    endTime: Date;
}
