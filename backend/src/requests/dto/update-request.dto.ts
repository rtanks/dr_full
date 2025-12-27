import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';
import { IsMongoId, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateRequestDto extends PartialType(CreateRequestDto) {
    @IsMongoId()
    @Optional()
    transactionId: string;

    @IsString()
    @Optional()
    statusPay: string;
}
