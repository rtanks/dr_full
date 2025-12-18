import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
    @IsString()
    @IsOptional()
    authority?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @IsOptional()
    refId?: number;

    @IsString()
    @IsOptional()
    message?: string;

    @IsNumber()
    @IsOptional()
    code?: number;

    @IsBoolean()
    @IsOptional()
    payed?: boolean;

    @IsDate()
    @IsOptional()
    verifyAt?: Date;
}
