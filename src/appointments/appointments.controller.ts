import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  // ✅ POST /appointments → Creează o nouă programare
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() dto: CreateAppointmentDto) {
    return this.service.create(dto);
  }

  // ✅ GET /appointments → Afișează toate programările
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // ✅ GET /appointments/today → Programările doar de azi
  @Get('today')
  getToday() {
    return this.service.findForDate();
  }

  // ✅ GET /appointments/history?date=2025-09-24 → Istoricul pentru o anumită dată
  @Get('history')
  getHistory(@Query('date') date?: string) {
    return this.service.findForDate(date);
  }

  // ✅ GET /appointments/:id → Detalii despre o programare specifică
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // ✅ DELETE /appointments/:id → Șterge o programare
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
