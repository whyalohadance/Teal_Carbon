// src/patients/dto/create-patient.dto.ts
import { IsString, IsNotEmpty, IsEmail, Length, Matches, IsIn, IsDateString } from 'class-validator';

export class CreatePatientDto {
  @IsString() @IsNotEmpty() firstName: string;
  @IsString() @IsNotEmpty() lastName: string;
  @IsDateString() birthDate: string;
  @Length(13,13) idnp: string;
  @IsEmail() email: string;
  @Matches(/^(06|07)\d{7}$/, { message: 'Phone must start with 06 or 07 and have 9 digits' }) phone: string;
  @IsIn(['M','F']) gender: 'M' | 'F';
}
