import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,) {}

  @Post('user/register')
  async register(@Body() createUserDto:CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  // @Post('user/login')
  // async login(@Body('phoneNumber') phoneNumber:string){
  //   return await this.authService.login(phoneNumber);
  // }

  @Post('retry-otp')
  async retryOtp(@Body('phoneNumber') phoneNumber:string) {
    return await this.authService.retryOtp(phoneNumber);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('phoneNumber') phoneNumber:string, @Body('otp') otp:number) {
    return await this.authService.verifyOtpAndLogin(phoneNumber, otp);
  }
  @Post('login/phone-number')
  async loginWithPhoneNumber(@Body('phoneNumber') phoneNumber:string) {
    return await this.authService.loginWithPhoneNumber(phoneNumber);
  }
}
