import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
    // verificăm dacă pacientul și doctorul există
    const patient = await this.prisma.patient.findUnique({ where: { id: dto.patientId } });
    const doctor = await this.prisma.staff.findUnique({ where: { id: dto.doctorId } });

    if (!patient) throw new BadRequestException('Pacientul nu există');
    if (!doctor) throw new BadRequestException('Doctorul nu există');

    return this.prisma.appointment.create({
      data: {
        date: new Date(dto.date),
        roomName: dto.roomName,
        price: dto.price,
        durationMin: dto.durationMin,
        patientId: dto.patientId,
        doctorId: dto.doctorId,
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: { patient: true, doctor: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, doctor: true },
    });
  }

  async remove(id: number) {
    return this.prisma.appointment.delete({ where: { id } });
  }
}
