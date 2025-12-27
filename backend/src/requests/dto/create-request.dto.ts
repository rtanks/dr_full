import { Optional } from "@nestjs/common";
import { IsBoolean, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class CreateRequestDto {
    @IsMongoId()
    userId: string;

    @IsString()
    category: string;

    @IsObject()
    request: any;
        
    @IsString()
    @Optional()
    statusPay: string;
    //success | failed | pending
}