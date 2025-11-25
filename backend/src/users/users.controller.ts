import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { QrService } from 'src/qr/qr.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private qrService:QrService) {}

  
  @Post("/register")
  async register(@Body() createUserDto:CreateUserDto) {
    return await this.usersService.register(createUserDto);
  }
  @Post("/login")
  async login(@Body('phoneNumber') phoneNumber: string) {
    return await this.usersService.login(phoneNumber);
  }

  @Get()
  async users() {
    const users = await this.usersService.users()
    return {message: "ok", data: users};
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findUserById(@Param('id') id: string) {
    return await this.usersService.findUserById(id);
  }
  @Get('qr/:id')
  @UseGuards(JwtAuthGuard)
  async getQrCode(@Param('id') id:string, @Res() res:Response) {
    const user = await this.usersService.findUserById(id);
    
    const text = `${process.env.FRONTEND_URL}/${user.nationalCode}`;
    
    const dataUrl = await this.qrService.toDataUrl(text);
    const base64 = dataUrl.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');

    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
    return user;
  }  

  @Patch('edit/:id')
  async editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.editUser(id, updateUserDto);
  }

  @Delete('/delete-user/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
