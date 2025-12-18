import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { RequestsService } from 'src/requests/requests.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, 
    private usersService:UsersService, private requestsService:RequestsService) {}
  @Post('login')
  async login(@Body() createAdminDto:CreateAdminDto) {
    return await this.adminService.login(createAdminDto);
  }
  
  @Get('patients')
  async getPatients() {
    return await this.usersService.users();
  }

  @Patch('user/edit')
  async editPatient(@Body('id') id: string, @Body() updateUserDto:UpdateUserDto) {
    return await this.usersService.editUser(id, updateUserDto)
  }

  @Post('user/create')
  async createPatient(@Body() createUserDto:CreateUserDto) {
    return await this.usersService.register(createUserDto);
  }

  @Get('need-for-action')
  async needForAction() {
    const requests = await this.requestsService.requestAll();
    const usersWithRequestPromises = requests.map(async (request) => {
      const user = await this.usersService.findUserById(String(request.userId));
      return {user, request}
    })
    const usersWithRequest = await Promise.all(usersWithRequestPromises)
    return usersWithRequest;
  }
}
