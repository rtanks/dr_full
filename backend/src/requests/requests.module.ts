import { forwardRef, Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from './entities/request.entity';
import { DraftService } from './draft.service';
import { RedisModule } from '../redis/redis.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Request.name, schema: RequestSchema}]),
    RedisModule, forwardRef(() => UsersModule)
  ],
  controllers: [RequestsController],
  providers: [RequestsService, DraftService],
  exports: [RequestsService]
})
export class RequestsModule {}
