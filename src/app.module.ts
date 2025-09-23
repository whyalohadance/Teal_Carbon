import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PatientsModule } from './patients/patients.module';
import { StaffModule } from './staff/staff.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [PrismaModule, PatientsModule, StaffModule, AppointmentsModule],
})
export class AppModule {}
