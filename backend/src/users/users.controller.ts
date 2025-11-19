import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/register-others")
  async registerOtherUser(@Body() createUserDto:CreateUserDto, @Body('explain') explain:string,
    @Body('service') service:string, @Body('title') title:string, @Body('center') center:string) {
    return await this.usersService.registerOtherUser(createUserDto, explain, service, title, center);
  }
  @Post("/register")
  async register(@Body() createUserDto:CreateUserDto) {
    return await this.usersService.register(createUserDto);
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

  @Patch('edit/:id')
  async editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.editUser(id, updateUserDto);
  }

  @Delete('/delete-user/:id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
