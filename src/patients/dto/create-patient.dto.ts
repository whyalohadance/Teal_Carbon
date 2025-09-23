import { IsString, IsNotEmpty, IsEmail, Matches, Length, IsIn, IsDateString, IsInt, Min } from 'class-validator';
import { Gender } from '@prisma/client';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  birthDate: string;

  @IsInt()
  @Min(0)
  age: number;

  @Length(13, 13)
  idnp: string;

  @IsEmail()
  email: string;

  @Matches(/^(06|07)\d{7}$/)
  phone: string;

  @IsIn([Gender.M, Gender.F])
  gender: Gender;
}
