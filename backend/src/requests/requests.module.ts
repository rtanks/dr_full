import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Request, RequestSchema } from './entities/request.entity';
import { DraftService } from './draft.service';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Request.name, schema: RequestSchema}]),
    RedisModule
  ],
  controllers: [RequestsController],
  providers: [RequestsService, DraftService],
  exports: [RequestsService]
})
export class RequestsModule {}
