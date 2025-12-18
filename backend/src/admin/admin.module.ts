import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './entities/admin.entity';
import { UsersModule } from 'src/users/users.module';
import { RequestsModule } from 'src/requests/requests.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Admin.name, schema: AdminSchema}]),
    UsersModule, RequestsModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
