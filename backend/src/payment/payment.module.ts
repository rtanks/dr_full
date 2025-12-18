import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './entities/payment.entity';
import { RequestsModule } from 'src/requests/requests.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Payment.name, schema: PaymentSchema}]),
    RequestsModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
