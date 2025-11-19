import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/register')
  async register(@Body() createUserDto:CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('user/login')
  async login(@Body('nationalCode') nationalCode:string){
    return await this.authService.login(nationalCode);
  }

  @Post('reagent/register') 
  async registerReagent(@Body('fullName') fullName:string, @Body('nationalCode') nationalCode:string, @Body('phoneNumber') phoneNumber:string){
    return await this.authService.registerReagent(fullName, nationalCode, phoneNumber);
  }

  @Post('reagent/login')
  async loginReagent(@Body('nationalCode') nationalCode:string){
    return await this.authService.loginReagent(nationalCode);
  }
}
