import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    if (!patient) throw new BadRequestException('Pacientul nu există');

    const doctor = await this.prisma.staff.findUnique({ where: { id: dto.doctorId } });
    if (!doctor) throw new BadRequestException('Doctorul nu există');

    const appt = await this.prisma.appointment.create({
      data: {
        date: new Date(dto.date),
        roomName: dto.roomName,
        price: dto.price,
        durationMin: dto.durationMin,
        patientId: dto.patientId,
        doctorId: dto.doctorId,
      },
      include: { patient: true, doctor: true },
    });

    return appt;
  }

  // găsește programările între două Date (incluziv) și le sortează după oră
  async findBetween(start: Date, end: Date) {
    return this.prisma.appointment.findMany({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { date: 'asc' },
      include: {
        patient: true,
        doctor: true,
      },
    });
  }

  // util: primește optional o dată string 'YYYY-MM-DD' sau undefined pentru azi
  async findForDate(dateStr?: string) {
    const { start, end } = this.getDayBounds(dateStr);
    return this.findBetween(start, end);
  }

  // opțional: findAll / findOne / remove (dacă vrei endpoints standard)
  async findAll() {
    return this.prisma.appointment.findMany({ include: { patient: true, doctor: true }, orderBy: { date: 'asc' } });
  }

  async findOne(id: number) {
    return this.prisma.appointment.findUnique({ where: { id }, include: { patient: true, doctor: true } });
  }

  async remove(id: number) {
    return this.prisma.appointment.delete({ where: { id } });
  }

  // calculează începutul și sfârșitul unei zile (în timezone local al serverului)
  private getDayBounds(dateStr?: string) {
    let year: number, month: number, day: number;
    if (dateStr) {
      const parts = dateStr.split('-').map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) {
        throw new BadRequestException('Parametrul date trebuie în format YYYY-MM-DD');
      }
      [year, month, day] = parts;
    } else {
      const t = new Date();
      year = t.getFullYear();
      month = t.getMonth() + 1;
      day = t.getDate();
    }

    // Folosim constructorul (year, monthIndex, day, h, m, s, ms) -> folosește timezone local
    const start = new Date(year, month - 1, day, 0, 0, 0, 0);
    const end = new Date(year, month - 1, day, 23, 59, 59, 999);
    return { start, end };
  }
}
