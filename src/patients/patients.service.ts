import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.patient.findMany({
      include: { appointments: true }, // вернём и список приёмов
    });
  }

  async findOne(id: number) {
    return this.prisma.patient.findUnique({
      where: { id },
      include: { appointments: true },
    });
  }

  async create(dto: CreatePatientDto) {
    // Проверка на уникальные поля
    const exist = await this.prisma.patient.findFirst({
      where: {
        OR: [{ idnp: dto.idnp }, { email: dto.email }, { phone: dto.phone }],
      },
    });
    if (exist) {
      throw new BadRequestException('Patient with same idnp/email/phone already exists');
    }

    const data: Prisma.PatientCreateInput = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: new Date(dto.birthDate),
      idnp: dto.idnp,
      email: dto.email,
      phone: dto.phone,
      gender: dto.gender,
      age: dto.age, // теперь всегда обязателен
    };

    return this.prisma.patient.create({ data });
  }

  async update(id: number, dto: UpdatePatientDto) {
    const updateData: Prisma.PatientUpdateInput = {};

    if (dto.firstName) updateData.firstName = dto.firstName;
    if (dto.lastName) updateData.lastName = dto.lastName;
    if (dto.birthDate) updateData.birthDate = new Date(dto.birthDate);
    if (dto.email) updateData.email = dto.email;
    if (dto.phone) updateData.phone = dto.phone;
    if (dto.gender) updateData.gender = dto.gender;
    if (dto.age !== undefined) updateData.age = dto.age;

    return this.prisma.patient.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
