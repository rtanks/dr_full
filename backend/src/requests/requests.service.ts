import { BadRequestException, forwardRef, Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Request, RequestDocument } from './entities/request.entity';
import { Model, Types } from 'mongoose';
import { DraftService } from './draft.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RequestsService {
  constructor(@InjectModel(Request.name) private requestModel: Model<RequestDocument>, private draftService: DraftService, 
    @Inject(forwardRef(() => UsersService)) private usersService:UsersService){}
  
  async saveRequestDraft(tempId:string, formData:any) {
    return await this.draftService.saveDraft(tempId, formData);
  }
  async getDraft(userKey:string) {
    return await this.draftService.getDraft(userKey);
  }
  async deleteDraft(userKey:string) {
    return await this.draftService.deleteDraft(userKey)
  }
  // -----------------------------------------------------------------
  async createOtherRequest(createRequestDto: CreateRequestDto) {
    const request = await this.requestModel.create(createRequestDto);
    if(!request) throw new BadRequestException('خطا در ایجاد درخواست')
    return request;
  }
  async createRequest(userId:string, category:string, requestData:any) {
    const request = await this.requestModel.create({userId, category, request: {doctor: "",...requestData}});
    if(!request) throw new BadRequestException('خطا در ایجاد درخواست')
    return request;
  }
  async createRequestAdmin(phoneNumber:string, category:string, requestData:any) {
    const userExisting = await this.usersService.findByPhoneNumber(phoneNumber);
    if(!userExisting) {
      throw new BadRequestException('کاربر موجود نیست')
    }
    const userId = String(userExisting._id);
    const request = await this.requestModel.create({userId, category, request: {...requestData}});
    return {request, user: userExisting}
  }
    

  async findUserRequestsByServiceName(userId: string, service: string) {
    const request = await this.requestModel.findOne({userId, service});
    if(!request) throw new NotFoundException('درخواستی برای این کاربر یافت نشد');
    return request;
  }
  
  //if have many request for user use this
  async findUserRequests(userId: string) {
    const request = await this.requestModel.find({userId}).sort({createdAt: -1});
    if(!request) throw new NotFoundException('درخواستی برای این کاربر یافت نشد');
    return request;
  }

  async requestAll() {
    return await this.requestModel.find().sort({createdAt: -1})
  }
  async lastRequest(userId:string) {
    const requests = await this.requestModel.find({userId}).sort({ createdAt: -1 }).limit(1);
    return requests[0];
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
  
  
  async updateRequestType(id:string) {
    const request = await this.requestModel.findByIdAndUpdate(id, {$set:{"request.type": ''}}, {new: true});
    return request;
  }
  async updateRequest(id:string, doctor:string) {
    const request = await this.requestModel.findByIdAndUpdate(id, {$set:{"request.doctor": doctor}}, {new: true});
    return request;
  }
  async updateRequestAllData(id:string, requestData:any) {
    const request = await this.requestModel.findByIdAndUpdate(id, {request: requestData}, {new: true});
    return request;
  }

  async getRequestsRecovery() {
    const requests = await this.requestModel.find({
      category: "hospital",
      "request.type": "recovery"
    });
    if(!requests) {
      throw new BadRequestException('هیچ درخواستی بااین نوع وجود ندارد!')
    }
    const withUser = await Promise.all(
      requests.map(async ( item:any ) => {
        const user = await this.usersService.findUserById(item.userId);
        return {user, request:item}
      } )
    )
    return withUser;
    // return requests;
  }

  async removeRequest(id: string) {
    const request = await this.requestModel.findByIdAndDelete(id);
    return request;
  }
}
