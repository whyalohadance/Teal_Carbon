import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Post, 
  Delete, 
  UsePipes, 
  ValidationPipe, 
  ParseIntPipe 
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // ✅ POST /staff → adaugă un nou membru (doctor, reception etc.)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  create(@Body() dto: CreateStaffDto) {
    return this.staffService.create(dto);
  }

  // ✅ GET /staff → returnează toți angajații
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  // ✅ GET /staff/:id → returnează un singur angajat după ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.staffService.findOne(id);
  }

  // ✅ DELETE /staff/:id → șterge un angajat
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.staffService.remove(id);
  }
}
