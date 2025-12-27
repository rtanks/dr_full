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
import { AdminModule } from './admin/admin.module';
import { MessageModule } from './message/message.module';
import { UserMessagesModule } from './user-messages/user-messages.module';
import { DoctorsModule } from './doctors/doctors.module';
import { HospitalModule } from './hospital/hospital.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join, resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '..', 'public'),
      // rootPath: resolve('E:/rez/TDA.DR/dr-full/files/uploads'),
      rootPath: resolve("/home/lovelybu/files.tda24.ir/uploads"),
      // serveRoot: '/uploads',
      serveRoot: '/',
      serveStaticOptions: {
        index: false,
        //this for server
        // fallthrough: true,
      }
    }),
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
    UsersModule, RequestsModule, QrModule, AuthModule, PaymentModule, AdminModule, MessageModule, UserMessagesModule, DoctorsModule, HospitalModule
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
