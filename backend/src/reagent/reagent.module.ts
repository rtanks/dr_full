import { Module } from '@nestjs/common';
import { ReagentService } from './reagent.service';
import { ReagentController } from './reagent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reagent, ReagentSchema } from './entities/reagent.entity';
import { QrModule } from 'src/qr/qr.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Reagent.name, schema: ReagentSchema}]),
    QrModule,
  ],
  controllers: [ReagentController],
  providers: [ReagentService],
  exports: [ReagentService]
})
export class ReagentModule {}
