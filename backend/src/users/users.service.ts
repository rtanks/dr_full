import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { RequestsService } from 'src/requests/requests.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly requestService:RequestsService){}

  async registerOtherUser(createUserDto:CreateUserDto, explain: string, service:string, title: string, center: string) {
    const userExisting = await this.userModel.findOne({nationalCode: createUserDto.nationalCode});
    if(userExisting) {
      throw new BadRequestException('کاربر در حال حاضر موجود است');
    }
    const user = await this.userModel.create(createUserDto);
    if(!user) throw new BadRequestException('خطا در ایجاد کاربر')
    const request = await this.requestService.createOtherRequest({userId: String(user._id), explain , service})
    return [user, request];
  }
  
  async register(createUserDto:CreateUserDto){
    const userExisting = await this.findByNationalCode(createUserDto.nationalCode);
    if(userExisting) {
      throw new BadRequestException('کاربر در حال حاضر موجوداست');
    }
    const user = await this.userModel.create(createUserDto);
    if(!user) throw new BadRequestException('خطا در ایجاد کاربر')
    return user;
  }

  async users() {
    return await this.userModel.find().sort({createdAt: -1}).exec();
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if(!user) throw new NotFoundException('کاربر مورد نظر یافت نشد')
    return user;
  }

  async findByNationalCode(nationalCode:string) {
    const existingUser = await this.userModel.findOne({ nationalCode }).exec();
    return existingUser;
  }

  async login(nationalCode:string){
    const userExisting = await this.findByNationalCode(nationalCode);
    if(!userExisting) {
      throw new BadRequestException('کاربر مورد نظر یافت نشد');
    }
    return userExisting;
  }
  
  async editUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto); 
    if(!user) throw new NotFoundException('کاربر مورد نظر یافت نشد')
    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);
    if(!user) throw new NotFoundException('کاربر مورد نظر یافت نشد')
    return user;
  }
}
