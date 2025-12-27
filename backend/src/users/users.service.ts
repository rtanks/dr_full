import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import { RequestsService } from '../requests/requests.service';
import * as path from 'path';
import * as fs from 'fs';
import sharp from 'sharp';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, 
  private readonly requestService:RequestsService){}
  //----profile image----------------------------------------------------------------
    async uploadProfileImage(userId:string, file: Express.Multer.File) {
      const user = await this.userModel.findById(userId);
      if(!user) throw new NotFoundException('کاربر مورد نظر یافت نشد!');

      const uploadPath = path.join(
        // __dirname, 
        "/home/lovelybu/files.tda24.ir/uploads/users",
        // "E:/rez/TDA.DR/dr-full/files/uploads/users",
        userId
      )

      if(!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, {recursive: true, mode: 0o755})
      }
      const oldFilePath = path.join(uploadPath, 'profile.webp');
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      const fileName = 'profile.webp';
      const filePath = path.join(uploadPath, fileName);

      await sharp(file.buffer).resize(300, 300).toFormat('webp').toFile(filePath)

      fs.chmodSync(filePath, 0o644)

      user.profileImage = `uploads/users/${userId}/${fileName}`;
      user.save();

      return user;
    }
  //---------------------------------------------------------------------------------
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
    return await this.userModel.find().sort({createdAt: -1}).limit(10);
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
      const request = await this.requestService.createRequestHospital(String(userExisting._id),requestData);
      return {request, user: userExisting}
    }
    const user = await this.userModel.create(createUserDto);
    if(!user) {
      throw new BadRequestException('خطا در ایجاد کاربر!')
    } 
    const request = await this.requestService.createRequestHospital(String(user._id),requestData);
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
  //--update user--------------------------------------------------------------------------
  async updateUserInformationKeyValue(id:string, key:string, value: string) {
    const birthdayRegex = /^1[3-4]\d{2}\/([1-9]|1[0-2])\/([1-9]|[12]\d|3[01])$/;
    const allowedFields = ['birthday','city', 'province'];
    if(!allowedFields.includes(key)) {
      throw new BadRequestException('ایجاد تغییرات برای فیلد مورد نظر مجاز نیست!');
    }
    if(!value && key == 'birthday' && value.match(birthdayRegex)) {
      throw new BadRequestException('تاریخ تولد نامعتبر است!')
    }
    const user = await this.userModel.findByIdAndUpdate(id, {[key]: value}, {new: true})
    if(!user) {
      throw new NotFoundException('کاربر یافتت نشد!');
    }
    return user;
  }
  //--------search-------------------------------------------------------------------------
  async searchUser(key: string, value: string){
    const users = await this.userModel.find({[key]: {$regex: value, $options: 'i'}});
    if(!users) throw new BadRequestException('کاربری یافت نشد!');
    return users;
  }
  async searchUserWithLimit(key: string, value: string, limit:number){
    console.log(key,value,limit)
    const users = await this.userModel.find({[key]: {$regex: value, $options: 'i'}});
    if(!users) throw new BadRequestException('کاربری یافت نشد!');
    return users;
  }
  async searchUserWithCityAndProvince(key: string, value: string, province:string, city:string){
    const users = await this.userModel.find({[key]: {$regex: value, $options: 'i'}, city, province});
    if(!users) throw new BadRequestException('کاربری یافت نشد!');
    return users;
  }


}
