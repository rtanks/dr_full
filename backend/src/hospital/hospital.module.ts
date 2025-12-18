import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hospital, HospitalSchema } from './entities/hospital.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Hospital.name, schema: HospitalSchema}]),
    DoctorsModule
  ],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
