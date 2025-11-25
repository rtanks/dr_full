import { Injectable } from '@nestjs/common';
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
    return await this.userService.register(createUserDto)
  }

  
  async login(fullName:string, nationalCode:string, phoneNumber:string) {
    const userExisting = await this.userService.loginAndRegister(fullName, nationalCode, phoneNumber);
    // const otpSend = await this.otpService.generateOtp(phoneNumber);
    // return {userExisting, otpSend};
    return {userExisting}
  }
  async retryOtp(phoneNumber:string) {
    const otpSend = await this.otpService.generateOtp(phoneNumber);
    return otpSend;
  }
  
  async verifyOtp(phoneNumber: string, otp: number) {
    const otpVerify = await this.otpService.verifyOtp(phoneNumber, otp);
    if(otpVerify) {
      const user = await this.userService.findByPhoneNumber(phoneNumber);
      if(user) {
        const accessToken = this.jwtService.sign({
          sub: user._id,
          nationalCode: user.nationalCode
        })
        return {...otpVerify, data: user, token: {accessToken}}
      }
    }
    // return otpVerify;
  }
}

// async login(fullName: string, nationalCode:string, phoneNumber: string, otp: number) {
//   if(otp != 0) {
//     const user = await this.userService.login(nationalCode, phoneNumber, fullName);
//     const accessToken = this.jwtService.sign({
//       sub: user._id,
//       nationalCode: user.nationalCode
//     })
//     return {message: "success", data: user}
//   } else if(otp == 0) {
//     const otpCode = await this.otpService.generateOtp(phoneNumber);
//     return otpCode
//   }
// }