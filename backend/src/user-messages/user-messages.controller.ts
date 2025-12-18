import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMessagesService } from './user-messages.service';

@Controller('user-messages')
export class UserMessagesController {
  constructor(private readonly userMessagesService: UserMessagesService) {}

  @Patch('change-status/:id')
  async changeStatusMessageToRead (@Param('id') id:string) {
    return await this.userMessagesService.changeStatusMessageToRead(id);
  }

  @Get('counter-unread/:userId')
  async getCountMessageUnread(@Param('userId') userId:string){
    return await this.userMessagesService.getUserMessageUnread(userId);
  }

  @Get('/:userId')
  async getUserMessages(@Param('userId') userId:string){
    return await this.userMessagesService.getUserMessages(userId);
  }
}
