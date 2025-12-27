import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post('add/doctor')
  async addDoctorToList(@Body('doctorId') doctorId:string) {
    return await this.hospitalService.addDoctorToList(doctorId);
  }
  @Get('doctors')
  async doctorList() {
    return await this.hospitalService.doctorList();
  }
  @Patch('update/doctor/activate')
  async updateActivate(@Body('doctorId') doctorId:string, @Body('activate') activate:boolean) {
    return await this.hospitalService.updateActivate(doctorId, activate);
  }
  @Delete('delete/doctor/:id')
  async deleteDoctor(@Param('id') id:string) {
    return await this.hospitalService.deleteDoctor(id);
  }
}
