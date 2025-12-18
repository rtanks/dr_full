import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService,) {}

  @Post('create')
  async createMessage(@Body() body: {type: string, title: string, text: string, link: string, usersId:string[]}) {
    console.log(body)
    const response = await this.messageService.createMessage(body.type, body.title, body.text, body.link, body.usersId);
    return {response, users: body.usersId}
  }
  
  
}
