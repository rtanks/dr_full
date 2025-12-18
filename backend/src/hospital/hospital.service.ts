import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Model } from 'mongoose';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Hospital, HospitalDocument } from './entities/hospital.entity';

@Injectable()
export class HospitalService {
  constructor(@InjectModel(Hospital.name) private hospitalModel:Model<HospitalDocument>, 
  private doctorsService:DoctorsService){}

  async addDoctorToList(doctorId:string) {
    const dr = await this.hospitalModel.findOne({doctorId});
    if(dr) {
      throw new BadRequestException('کاربردر حال خاصر موجود است!')
    }
    const newDr = await this.hospitalModel.create({doctorId});
    return newDr;
  }

  async updateActivate(doctorId:string, activate:boolean) {
    console.log(doctorId, activate)
    const dr = await this.hospitalModel.findOneAndUpdate({doctorId},{activate: activate ? false : true});
    if(!dr) {
      throw new BadRequestException('کاربردر حال خاصر موجود نیست!')
    }
    return dr;
  }

  async doctorList() {
    const doctors = await this.hospitalModel.find().sort({createdAt:-1});
    const doctorsWithName = await Promise.all(
      doctors.map(async (doctor) => {
        const dr = await this.doctorsService.findDoctorById(String(doctor.doctorId));
        return {id: dr?._id, fullName: dr?.fullName, activate: doctor.activate}
      })
    )
    return doctorsWithName;
  }
}
