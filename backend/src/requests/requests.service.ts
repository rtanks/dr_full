import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Request, RequestDocument } from './entities/request.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class RequestsService {
  constructor(@InjectModel(Request.name) private requestModel: Model<RequestDocument>){}
  
  async createOtherRequest(createRequestDto: CreateRequestDto) {
    const request = await this.requestModel.create(createRequestDto);
    if(!request) throw new BadRequestException('خطا در ایجاد درخواست')
    return request;
  }

  async findUserRequestsByServiceName(userId: string, service: string) {
    const request = await this.requestModel.findOne({userId, service});
    if(!request) throw new NotFoundException('درخواستی برای این کاربر یافت نشد');
    return request;
  }
  
  //if have many request for user use this
  async findUserRequests(userId: string) {
    const request = await this.requestModel.find({userId});
    if(!request) throw new NotFoundException('درخواستی برای این کاربر یافت نشد');
    return request;
  }

  async findRequest(id: string) {
    const request = await this.requestModel.findById(id);
    if(!request) throw new NotFoundException('درخواست مورد نظر یافت نشد');
    return request;
  }

  // update(id: number, updateRequestDto: UpdateRequestDto) {
  //   return `This action updates a #${id} request`;
  // }
  async completeOrderLevelOne(id: string, updateRequestDto:Partial<UpdateRequestDto>) {
    const request = await this.requestModel.findByIdAndUpdate(id, updateRequestDto, {new:true})
    if(!request) throw new NotFoundException('درخواست مورد نظر یافت نشد');
    return request;
  }
  

  // remove(id: number) {
  //   return `This action removes a #${id} request`;
  // }
}
