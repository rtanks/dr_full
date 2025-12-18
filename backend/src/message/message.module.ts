import { forwardRef, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message.entity';
import { UsersModule } from 'src/users/users.module';
import { UserMessagesModule } from 'src/user-messages/user-messages.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
    UsersModule, forwardRef(() => UserMessagesModule)
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
