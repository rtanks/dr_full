import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor, DoctorDocument } from './entities/doctor.entity';
import { Model } from 'mongoose';

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor.name) private doctorModel:Model<DoctorDocument>){}
  async login(nationalCode:string, password:string) {
    const user = await this.doctorModel.findOne({nationalCode, password})
    if(!user) {
      throw new BadRequestException('کاربر در حال حاضر موجود نیست!')
    }
    return user;
  }
  
  async register(createDoctorDto:CreateDoctorDto) {
    const checkExisting = await this.doctorModel.findOne({nationalCode: createDoctorDto.nationalCode});
    if(checkExisting) {
      throw new BadRequestException('کاربری با این اطلاعات قبلاً ثبت‌نام شده است')
    }
    const user = await this.doctorModel.create(createDoctorDto);
    user.password = createDoctorDto.nationalCode.slice(6,10);
    if(!user) {
      throw new ConflictException('خطا در ایجاد کاربر!')
    }
    return user;
  }

  async edit(id:string, updateDoctorDto:UpdateDoctorDto) {
    //new for return new data created
    //runValidation for validation data update
    const user = await this.doctorModel.findByIdAndUpdate(id, updateDoctorDto, 
      {new: true, runValidators: true});
    if(!user) {
      throw new NotFoundException('کاربر مورد موجود نیست!')
    }
    return user;
  }

  async listDoctors() {
    return await this.doctorModel.find();
  }

  async getDoctorsWithSpecialty(specialty:string) {
    const doctors = await this.doctorModel.find({specialty: {$regex: specialty, $options:'i'}})
    if(!doctors) {
      throw new BadRequestException('کاربری برای این فیلد یافت نشد!')
    }
    return doctors;
  } 

  async changeIsActivate(id:string, isActive:boolean) {
    console.log(isActive)
    const doctor = await this.doctorModel.findByIdAndUpdate(id, {isActive: isActive? false: true});
    if(!doctor) {
      throw new BadRequestException('کاربر مورد نظر یافت نشد!');
    }
    return doctor;
  }

  async searchDoctorWithName(fullName: string) {
    const user = await this.doctorModel.find({fullName: {$regex: fullName, $options: 'i'}});
    if(!user) {
      throw new BadRequestException('کاربر یافت نشد!');
    }
    return user;
  }

  async findDoctorById(id:string) {
    const dr = await this.doctorModel.findById(id);
    if(!id) throw new BadRequestException('کاربر یافت نشد!');

    return dr
  }
}
