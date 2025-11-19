import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ReagentService } from 'src/reagent/reagent.service';

@Injectable()
export class AuthService {
  constructor(private userService:UsersService, private reagentService:ReagentService, private jwtService:JwtService){}
  
  async register(createUserDto:CreateUserDto) {
    return await this.userService.register(createUserDto)
  }

  async login(nationalCode:string) {
    const user = await this.userService.login(nationalCode);
    const accessToken = this.jwtService.sign({
      sub: user._id,
      nationalCode: user.nationalCode
    })
    return {message: "success", data: user, token: {accessToken: accessToken}}
  }

  async registerReagent(fullName: string, nationalCode:string, phoneNumber: string){
    return await this.reagentService.register(fullName, nationalCode, phoneNumber);
  }
  
  async loginReagent(nationalCode:string) {
    const user = await this.reagentService.login(nationalCode);
    const accessToken = this.jwtService.sign({
      sub: user._id,
      nationalCode: user.nationalCode
    })
    return {message: "success", data: user, token: {accessToken: accessToken}}
  }
}
