import { 
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { UppercaseNamePipe } from '../common/pipes/uppercase-name.pipe';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // ✅ GET /patients → întoarce toți pacienții
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  // ✅ trebuie pusă ruta /search înainte de /:id (altfel se interpretează ca ID)
  @Get('search/by-name')
  searchByName(@Query('name') name: string) {
    return this.patientsService.searchByName(name);
  }

  // ✅ GET /patients/:id → un singur pacient
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.findOne(id);
  }

  // ✅ POST /patients → crează un pacient nou (cu nume în majuscule)
  @Post()
  @UsePipes(
    new ValidationPipe({ transform: true, whitelist: true }),
    new UppercaseNamePipe(),
  )
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
  }

  // ✅ PUT /patients/:id → actualizează pacientul
  @Put(':id')
  @UsePipes(
    new ValidationPipe({ transform: true, whitelist: true }),
    new UppercaseNamePipe(),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePatientDto,
  ) {
    return this.patientsService.update(id, dto);
  }

  // ✅ DELETE /patients/:id → șterge pacientul
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.remove(id);
  }
}
