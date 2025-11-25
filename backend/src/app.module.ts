import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { QrModule } from './qr/qr.module';
import {MongooseModule} from '@nestjs/mongoose';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import * as passport from 'passport';
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGO_URL}`),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 120, //millisecond
          limit: 10
        }
      ]
    }),
    UsersModule, RequestsModule, QrModule, AuthModule, PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, passport.initialize).forRoutes('*');
    //use * this means for all routes
  }
}
