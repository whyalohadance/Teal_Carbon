import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  // ----------------------------
  // Creează un angajat nou
  // ----------------------------
  async create(dto: CreateStaffDto) {
    const exist = await this.prisma.staff.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });
    if (exist) {
      throw new BadRequestException(
        'Staff with same email/phone already exists',
      );
    }

    const data: Prisma.StaffCreateInput = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: new Date(dto.birthDate),
      gender: dto.gender,
      role: dto.role,
      phone: dto.phone,
      email: dto.email,
    };

    const staff = await this.prisma.staff.create({ data });
    return { ...staff, age: this.calculateAge(staff.birthDate) };
  }

  // ----------------------------
  // Afișează toți angajații
  // ----------------------------
  async findAll() {
    const staffList = await this.prisma.staff.findMany();
    return staffList.map((s) => ({
      ...s,
      age: this.calculateAge(s.birthDate),
    }));
  }

  // ----------------------------
  // Afișează un singur angajat
  // ----------------------------
  async findOne(id: number) {
    const staff = await this.prisma.staff.findUnique({ where: { id } });
    if (!staff) return null;
    return { ...staff, age: this.calculateAge(staff.birthDate) };
  }

  // ----------------------------
  // Șterge angajat
  // ----------------------------
  async remove(id: number) {
    return this.prisma.staff.delete({ where: { id } });
  }

  // ----------------------------
  // Funcție privată → calculează vârsta din birthDate
  // ----------------------------
  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }
}
