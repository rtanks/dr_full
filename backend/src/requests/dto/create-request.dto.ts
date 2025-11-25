import { IsBoolean, IsMongoId, IsNumber, IsObject, IsOptional, IsString } from "class-validator";


export class CreateRequestDto {
    @IsMongoId()
    userId: string;

    @IsObject()
    request: any;
        
    @IsBoolean()
    statusPay: boolean;

    @IsMongoId()
    transactionId: string;
}