// src/patients/patients.service.ts
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
      include: { appointments: true },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.patient.findUnique({
      where: { id },
      include: { appointments: true },
    });
  }

  // Search by name (already added)
  async searchByName(name: string) {
    return this.prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: name, mode: 'insensitive' } },
          { lastName: { contains: name, mode: 'insensitive' } },
        ],
      },
      orderBy: { lastName: 'asc' },
    });
  }

  async create(dto: CreatePatientDto) {
    // 1) Check duplicates
    const exist = await this.prisma.patient.findFirst({
      where: {
        OR: [{ idnp: dto.idnp }, { email: dto.email }, { phone: dto.phone }],
      },
    });
    if (exist) {
      throw new BadRequestException('Patient with same idnp/email/phone already exists');
    }

    // 2) Calculate age from birthDate
    const birth = new Date(dto.birthDate);
    if (isNaN(birth.getTime())) {
      throw new BadRequestException('Invalid birthDate');
    }
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    if (age < 0) {
      throw new BadRequestException('birthDate is in the future');
    }

    // 3) Prepare data and create
    const data: Prisma.PatientCreateInput = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: birth,
      idnp: dto.idnp,
      email: dto.email,
      phone: dto.phone,
      gender: dto.gender,
      age: age,
    };

    return this.prisma.patient.create({ data });
  }

  async update(id: number, dto: UpdatePatientDto) {
    const updateData: Prisma.PatientUpdateInput = {};

    if (dto.firstName) updateData.firstName = dto.firstName;
    if (dto.lastName) updateData.lastName = dto.lastName;
    if (dto.birthDate) {
      const birth = new Date(dto.birthDate);
      if (isNaN(birth.getTime())) {
        throw new BadRequestException('Invalid birthDate');
      }
      // recalculează vârsta dacă schimbăm birthDate
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      if (age < 0) {
        throw new BadRequestException('birthDate is in the future');
      }
      updateData.birthDate = birth;
      updateData.age = age;
    }

    if (dto.email) updateData.email = dto.email;
    if (dto.phone) updateData.phone = dto.phone;
    if (dto.gender) updateData.gender = dto.gender;

    return this.prisma.patient.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    return this.prisma.patient.delete({ where: { id } });
  }
}
