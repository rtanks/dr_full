import { IsBoolean, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreatePaymentDto {
    @IsMongoId()
    userId: string;

    @IsNumber()
    amount: number;

    @IsString()
    description: string;
    
}