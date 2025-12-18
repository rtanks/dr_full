import { BadRequestException, Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(private userService:UsersService,
    private jwtService:JwtService, private otpService: OtpService){}
  
  async register(createUserDto:CreateUserDto) {
    const user = await this.userService.register(createUserDto)
    if(!user){
      throw new BadRequestException('خطا در ایجاد کاربر!')
    }
    const accessToken = this.jwtService.sign({
        sub: user._id,
        nationalCode: user.nationalCode
      })
    return {user, token:{accessToken}}
  }

  
  async loginAndRegister(fullName:string, nationalCode:string, phoneNumber:string) {
    const userExisting = await this.userService.loginAndRegister(fullName, nationalCode, phoneNumber);
    // const otpSend = await this.otpService.generateOtp(phoneNumber);
    // return {userExisting, otpSend};
    return {userExisting}
  }
  async retryOtp(phoneNumber:string) {
    const otpSend = await this.otpService.generateOtp(phoneNumber);
    return otpSend;
  }
  
  async verifyOtpAndLogin(phoneNumber: string, otp: number) {
    const otpVerify = await this.otpService.verifyOtp(phoneNumber, otp);
    if(otpVerify) {
      const user = await this.userService.findByPhoneNumber(phoneNumber);
      if(!user){
        throw new BadRequestException('کاربر مورد نظر یافت نشد!')
      }
      const accessToken = this.jwtService.sign({
        sub: user._id,
        nationalCode: user.nationalCode
      })
      return {...otpVerify, data: user, token: {accessToken}}
    }
    return otpVerify;
  }

  async loginWithPhoneNumber(phoneNumber:string) {
    const user = await this.userService.findByPhoneNumber(phoneNumber);
      if(!user){
        throw new BadRequestException('کاربر مورد نظر یافت نشد!')
      }
      const accessToken = this.jwtService.sign({
        sub: user._id,
        nationalCode: user.nationalCode
      })
    return {data: user, token: {accessToken}}
  }
}
