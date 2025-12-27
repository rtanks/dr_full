import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { QrService } from 'src/qr/qr.service';
import { CreateRequestDto } from 'src/requests/dto/create-request.dto';
import path from 'path';
import {FileInterceptor} from '@nestjs/platform-express'
import { memoryStorage } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private qrService:QrService) {}

  @Post('profile-image')
  @UseInterceptors(FileInterceptor('file', {limits:{fileSize: 2 * 1024 * 1024}, storage: memoryStorage()}))
  async uploadProfileImage(@Body('userId') userId:string ,@UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return await this.usersService.uploadProfileImage(userId,file); 
  }
  @Post("/register")
  async register(@Body() createUserDto:CreateUserDto) {
    return await this.usersService.register(createUserDto);
  }
  @Post("/login")
  async login(@Body('phoneNumber') phoneNumber: string) {
    return await this.usersService.login(phoneNumber);
  }
  @Post('create-user/request')
  async createUserAndRequest(@Body('user') createUserDto:CreateUserDto, @Body('request') request:any){
    return await this.usersService.createUserAndRequest(createUserDto, request);
  }

  @Get('admin/users/search')
  async searchUserAdmin(@Query('key') key:string, @Query('value') value:string){
    return await this.usersService.searchUser(key, value);
  }
  @Get('/search')
  async searchUser(@Query('key') key:string, @Query('value') value:string){
    return await this.usersService.searchUser(key, value);
  }
  @Get('/search/limit')
  async searchUserWithLimit(@Query('key') key:string, @Query('value') value:string, @Query('limit') limit:number){
    return await this.usersService.searchUserWithLimit(key, value, limit);
  }
  @Get('/search/with-cp')
  @UseGuards(JwtAuthGuard)
  async searchUserWithCp(@Query('key') key:string, @Query('value') value:string
  , @Query('province') province:string, @Query('city') city:string){
    return await this.usersService.searchUserWithCityAndProvince(key, value, province, city);
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
  @Patch('update-user')
  async updateUserAndRequest(@Body('id') id:string,@Body('user') user:Partial<UpdateUserDto>, 
  @Body('requestId') requestId:string ,@Body('request') request:any) {
    return await this.usersService.updateUserAndRequest(id, user, requestId, request)
  }


  @Delete('/delete-user/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
