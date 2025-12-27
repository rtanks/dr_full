import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.entity';
import { Model } from 'mongoose';
import { UserMessagesService } from 'src/user-messages/user-messages.service';
import axios from 'axios';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel:Model<MessageDocument>, private userMessageService:UserMessagesService){}
  
  async createMessage(type: string, title: string, text: string, link: string, usersId:string[]) {
    const message = await this.messageModel.create({type, title, text, link, usersId});
    if(!message) {
      throw new BadRequestException('خطا در ایجاد پیام!')
    }
    if(!usersId) {
      throw new BadRequestException('خطا در ثبت پیام کاربران!')
    }
    const usersMessages = usersId.map(id => ({
      userId: id,
      messageId: message._id,
      type: type,
      status: 'unread'
    }))
    const result = await this.userMessageService.create(usersMessages);
    return {message, result};
  }


  async findMessage(id:string) {
    const response = await this.messageModel.findById(id);
    return {title: response?.title, text: response?.text, link: response?.link};
  }

  async sendSmsForHospitalPatient(phoneNumber:string, fullName: string) {
    const data = JSON.stringify({mobile: phoneNumber, templateId: '857548', 
        parameters: [{name: "NAME" , value: String(fullName)}],});
    const sms = await axios.post('https://api.sms.ir/v1/send/verify', data, 
        {headers: {
            'Content-Type': 'application/json','Accept': 'text/plain',
            'x-api-key': 'L40UGRICQDvHN3F93OuDafT0xiom3okCphDgtrAfYjpng77f9ZzNaahQGyp9wI5b'
        }}).then(res => res).catch(err => {
            // this.otpModel.deleteOne({ _id: otp._id });
            throw new BadRequestException(
                err.response || 'خطا در ارسال پیامک'
            );
        })
    
    // return {otp};
    return sms.data;
  }
}
