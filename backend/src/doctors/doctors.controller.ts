import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('register')
  async register(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.register(createDoctorDto);
  }
  @Post('login')
  async login(@Body('nationalCode') nationalCode:string, @Body('password') password:string) {
    return await this.doctorsService.login(nationalCode, password);
  }

  @Patch('edit/:id')
  async edit(@Param('id') id:string, @Body() updateDoctorDto:Partial<UpdateDoctorDto>) {
    const response = await this.doctorsService.edit(id, updateDoctorDto);
    return response;
  }
  @Patch('activate/update/:id')
  async changeIsActivate(@Param('id') id:string, @Body('isActive') isActive:boolean) {
    console.log(isActive)
    return await this.doctorsService.changeIsActivate(id, isActive)
  }

  @Get('list')
  async listDoctors() {
    return this.doctorsService.listDoctors();
  }
  @Get('doctors/specialty-filter/:specialty')
  async getDoctorsWithSpecialty(@Param('specialty') specialty:string) {
    console.log(specialty, typeof specialty)
    return await this.doctorsService.getDoctorsWithSpecialty(specialty);
  }
  @Get('search/doctor/:fullName')
  async searchDoctorWithName(@Param('fullName') fullName:string) {
    return await this.doctorsService.searchDoctorWithName(fullName);
  }
}
