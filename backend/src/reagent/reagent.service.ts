import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReagentDto } from './dto/create-reagent.dto';
import { UpdateReagentDto } from './dto/update-reagent.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reagent, ReagentDocument } from './entities/reagent.entity';
import { Model } from 'mongoose';
import { v4 } from 'uuid';

@Injectable()
export class ReagentService {
  constructor(@InjectModel(Reagent.name) private reagentModel:Model<ReagentDocument>){}

  async register(fullName: string, nationalCode:string, phoneNumber: string) {
    const existUser = await this.reagentModel.findOne({nationalCode: nationalCode});
    if(existUser) {
      throw new BadRequestException('کاربر در حال حاضر موجود است')
    }
    
    const code = v4();
    const user = await this.reagentModel.create({fullName: fullName, nationalCode: nationalCode, phoneNumber: phoneNumber, code: code})
    return user;
  }

  async login(nationalCode:string){
    const user = await this.reagentModel.findOne({nationalCode: nationalCode});
    if(!user) {
      throw new BadRequestException('کاربر مورد نظر یافت نشد')
    }
    return user;
  }

  async findUser(id:string) {
    const user = await this.reagentModel.findById(id);
    if(!user) {
      throw new BadRequestException('کاربر مورد نظر یافت نشد')
    }
    return user;
  }
}
