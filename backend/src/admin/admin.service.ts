import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './entities/admin.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel:Model<Admin>){}
  async login(createAdminDto:CreateAdminDto) {
    const admin = await this.adminModel.findOne({nationalCode: createAdminDto.nationalCode});
    if(!admin) {
      throw new BadRequestException('کاربر مورد نظر یافت نشد!')
    }
    return admin;
  }
  
}
