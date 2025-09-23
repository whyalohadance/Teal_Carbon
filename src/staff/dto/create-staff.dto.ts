import { IsString, IsEmail, IsNotEmpty, IsDateString, IsIn, Matches } from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  birthDate: string;

  age: number;

  @IsIn(['M', 'F'])
  gender: 'M' | 'F';

  @IsIn(['ADMIN', 'DOCTOR', 'RECEPTION', 'CALLCENTER'])
  role: 'ADMIN' | 'DOCTOR' | 'RECEPTION' | 'CALLCENTER';

  @Matches(/^(06|07)\d{7}$/)
  phone: string;

  @IsEmail()
  email: string;
}
