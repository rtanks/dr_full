import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { UpdateUserMessageDto } from './dto/update-user-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserMessage, UserMessageDocument } from './entities/user-message.entity';
import { Model } from 'mongoose';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class UserMessagesService {
  constructor(@InjectModel(UserMessage.name) private userMessageModel:Model<UserMessageDocument>, 
  @Inject(forwardRef(() => MessageService)) private messageService:MessageService){}
  async create(usersMessage:any) {
    const response = await this.userMessageModel.insertMany(usersMessage);
    if(!response) {
      throw new Error('خطا در ایجاد پیام!')
    }
    return response;
  }

  async changeStatusMessageToRead(id:string) {
    const response = await this.userMessageModel.findById(id);
    if(!response) { throw new BadRequestException('پیام مورد نظر یافت نشد!')}
    response.status = 'read';
    response.save();
    return response;
  }

  async getUserMessageUnread(userId: string) {
    const response = await this.userMessageModel.find({userId, status: 'unread'});
    return response;
  }

  async getUserMessages(userId: string) {
    const response = await this.userMessageModel.find({userId});
    if(!response) {throw new BadRequestException('خطا در دریافت پیام!')}
    const allMessage = await Promise.all(
      response.map(async (item:any) => {
      const message = await this.messageService.findMessage(String(item.messageId));
      return {id: item._id, status: item.status, create: item?.createdAt, type: item.type ,...message};
    })
    )
    return {allMessage};
  }

}
