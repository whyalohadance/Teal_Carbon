import { IsString, IsNotEmpty, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  roomName: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  durationMin: number;

  @IsNumber()
  patientId: number;

  @IsNumber()
  doctorId: number;
}
