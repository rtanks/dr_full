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

  @Post('user/login')
  async login(@Body() body: {fullName: string, nationalCode: string, phoneNumber: string}){
    return await this.authService.login(body.fullName, body.nationalCode, body.phoneNumber);
  }

  @Post('retry-otp')
  async retryOtp(@Body('phoneNumber') phoneNumber:string) {
    return await this.authService.retryOtp(phoneNumber);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('phoneNumber') phoneNumber:string, @Body('otp') otp:number) {
    return await this.authService.verifyOtp(phoneNumber, otp);
  }
}
