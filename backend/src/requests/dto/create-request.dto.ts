import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateRequestDto {
    @IsString()
    userId: string;

    @IsString()
    service: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsString()
    explain: string;

    @IsString()
    @IsOptional()
    center?: string;
}