import { 
  Controller, Get, Param, Post, Body, Put, Delete, 
  UsePipes, ValidationPipe, ParseIntPipe, Query 
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UppercaseNamePipe } from '../common/pipes/uppercase-name.pipe';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(id);
  }

  // ✅ nou: căutare după nume
  @Get('search/by-name')
  searchByName(@Query('name') name: string) {
    return this.patientsService.searchByName(name);
  }

  // ✅ folosim pipe pentru majuscule
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }), UppercaseNamePipe)
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }), UppercaseNamePipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.remove(id);
  }
}
