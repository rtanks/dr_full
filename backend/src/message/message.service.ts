import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './entities/message.entity';
import { Model } from 'mongoose';
import { UserMessagesService } from 'src/user-messages/user-messages.service';

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
}
