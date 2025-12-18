import { forwardRef, Module } from '@nestjs/common';
import { UserMessagesService } from './user-messages.service';
import { UserMessagesController } from './user-messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMessage, UserMessageSchema } from './entities/user-message.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserMessage.name, schema: UserMessageSchema}]),
    forwardRef(() => MessageModule)
  ],
  controllers: [UserMessagesController],
  providers: [UserMessagesService],
  exports:[UserMessagesService]
})
export class UserMessagesModule {}
