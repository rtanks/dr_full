import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './entities/doctor.entity';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Doctor.name, schema: DoctorSchema}])
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService]
})
export class DoctorsModule {}
