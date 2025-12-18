import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { RequestsService } from '../requests/requests.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, 
  private readonly requestService:RequestsService){}
  
  async loginAndRegister(fullName:string, nationalCode:string, phoneNumber:string ) {
    const existingUser = await this.userModel.findOne({phoneNumber});
    if(!existingUser) {
      const user = await this.userModel.create({fullName, nationalCode, phoneNumber});
      if(!user) throw new BadRequestException('خطا در ایجاد کاربر')
      return {message: "register success", data: user};
    } 
    return {message: "login success", data: existingUser};
  }
  
  async register(createUserDto:CreateUserDto){
    const userExisting = await this.findByPhoneNumber(createUserDto.phoneNumber);
    if(userExisting) {
      throw new BadRequestException('کاربر در حال حاضر موجوداست');
    }
    const user = await this.userModel.create(createUserDto);
    if(!user) throw new BadRequestException('خطا در ایجاد کاربر')
    return user;
  }
  async login(phoneNumber: string){
    const userExisting = await this.findByPhoneNumber(phoneNumber);
    if(!userExisting) {
      throw new BadRequestException('کاربر مورد نظر یافت نشد');
    }
    return userExisting;
  }
  
  async users() {
    return await this.userModel.find().sort({createdAt: -1}).exec();
  }
  async usersFindWithCityProvince(city:string, province:string) {
    return await this.userModel.find({city, province});
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if(!user) throw new NotFoundException('کاربر مورد نظر یافت نشد')
    return user;
  }

  async findByPhoneNumber(phoneNumber:string) {
    const existingUser = await this.userModel.findOne({ phoneNumber });
    return existingUser;
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

  async createUserAndRequest(createUserDto:CreateUserDto,requestData:any) {
    const userExisting = await this.findByPhoneNumber(createUserDto.phoneNumber);
    if(userExisting) {
      const request = await this.requestService.createRequest(String(userExisting._id),'hospital',requestData);
      return {request, user: userExisting}
    }
    const user = await this.userModel.create(createUserDto);
    if(!user) {
      throw new BadRequestException('خطا در ایجاد کاربر!')
    } 
    const request = await this.requestService.createRequest(String(user._id),'hospital',requestData);
    return {request, user}
  }
  async updateUserAndRequest(id:string, updateUserDto: Partial<UpdateUserDto>, requestId:string ,requestData:any) {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto)
    if(!user) {
      throw new BadRequestException('کاربر یافت نشد!')
    } 
    const request = await this.requestService.updateRequestAllData(requestId,requestData);
    return {request, user}
  }

  async searchUser(key: string, value: string){
    const users = await this.userModel.find({[key]: {$regex: value, $options: 'i'}});
    if(!users) throw new BadRequestException('کاربری یافت نشد!');
    return users;
  }


}
