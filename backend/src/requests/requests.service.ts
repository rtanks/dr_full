import { BadRequestException, forwardRef, Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Request, RequestDocument } from './entities/request.entity';
import { Model, Types } from 'mongoose';
// import { DraftService } from './draft.service';
import { UsersService } from '../users/users.service';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class RequestsService {
  constructor(@InjectModel(Request.name) private requestModel: Model<RequestDocument>,
  @Inject(forwardRef(() => UsersService)) private usersService:UsersService, private doctorsService:DoctorsService){}
  //-------------------------user patient-------------------------------------------
  async createOtherRequest(createRequestDto: CreateRequestDto) {
    const request = await this.requestModel.create(createRequestDto);
    if(!request) throw new BadRequestException('خطا در ایجاد درخواست')
      return request;
  }
  //update for payment cancel , success
  async updateRequestPaymentId (requestId:string, transactionId: string, statusPay: string) {
    const request = await this.requestModel.findByIdAndUpdate(requestId, {transactionId, statusPay})
    return request;
  }
  async getUserRequestsWithoutHospital(userId:string) {
    const request = await this.requestModel.find({userId , category: {$ne: 'hospital', $exists: true }}).sort({createdAt: -1});
    if(!request) throw new NotFoundException('درخواستی برای این کاربر یافت نشد');
    return request;
  }
  // ----admin----------------------------------------------------------------
  async createRequestAdmin(phoneNumber:string, category:string, requestData:any) {
    const userExisting = await this.usersService.findByPhoneNumber(phoneNumber);
    if(!userExisting) {
      throw new BadRequestException('کاربر موجود نیست')
    }
    const userId = String(userExisting._id);
    const request = await this.requestModel.create({userId, category, request: {...requestData}});
    return {request, user: userExisting}
  }
  // ---------general-----------------------------------------------------------
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
    return await this.requestModel.find().sort({createdAt: -1}).limit(10)
  }
  async lastRequest(userId:string) {
    const requests = await this.requestModel.find({userId}).sort({ createdAt: -1 }).limit(1);
    return requests[0];
  }
  
  async findRequest(id: string) {
    const request = await this.requestModel.findById(id);
    if(!request) throw new NotFoundException('درخواست مورد نظر یافت نشد');
    if(request.request.doctor) {
      const doctor = await this.doctorsService.getDoctorWithFullName(request.request.doctor);
      return {request, doctor}
    }
    return {request, doctor: {}};
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
    async updateRequestAllData(id:string, requestData:any) {
      const request = await this.requestModel.findByIdAndUpdate(id, {request: requestData}, {new: true});
      return request;
    }
    async removeRequest(id: string) {
      const request = await this.requestModel.findByIdAndDelete(id);
      return request;
    }
    //--------------------------hospital request----------------------------------------------------------------------------------------------
    async createRequestHospital(userId:string, requestData:any) {
      const request = await this.requestModel.create({userId, category: 'hospital', request: {doctor: "", type: 'free',...requestData}});
      if(!request) throw new BadRequestException('خطا در ایجاد درخواست')
        return request;
    }
    async getRequestsHospital() {
      const requests = await this.requestModel.find({ 'request.type': 'free' });
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
    }
    //update doctor
    async updateRequestHospitalUser(id:string, doctor:string) {
      console.log(doctor)
      if(doctor == "") {
        const request = await this.requestModel.findByIdAndUpdate(id, 
          {category: "hospital" , 
            $set:{"request.doctor": doctor, "request.service":''}}, {new: true});
        return request;
      } else {

        const request = await this.requestModel.findByIdAndUpdate(id, 
          {category: "doctorConsulting" , 
            $set:{"request.doctor": doctor, "request.service":'ویزیت پزشک'}}, {new: true});
        return request;
      }
    }
    
  //------------------------------------------------------------------------------------------------------------------------
  }
//------------------------------------------------------------------------------------------------------------------------
// constructor(@InjectModel(Request.name) private requestModel: Model<RequestDocument>, private draftService: DraftService, 

// async saveRequestDraft(tempId:string, formData:any) {
//   return await this.draftService.saveDraft(tempId, formData);
// }
// async getDraft(userKey:string) {
//   return await this.draftService.getDraft(userKey);
// }
// async deleteDraft(userKey:string) {
//   return await this.draftService.deleteDraft(userKey)
// }