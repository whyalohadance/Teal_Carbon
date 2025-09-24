import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAppointmentDto) {
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
}
