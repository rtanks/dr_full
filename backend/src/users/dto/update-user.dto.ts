import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString , IsOptional, Length, IsObject} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
     @IsString()
        fullName: string;
    
        @IsString()
        @Length(10,10, {message: "کد ملی شما معتبر نیست"})
        nationalCode: string;
    
        @IsString()
        @Length(11, 11, {message: 'شماره تلفن شما معتبر نیست'})
        phoneNumber: string;
    
        @IsString()
        @IsOptional()
        province?: string;
        
        @IsString()
        @IsOptional()
        city?: string;
    
        @IsString()
        @IsOptional()
        birthday?: string;
        
        @IsObject()
        location?: any;
        //{lat, lng}
    
        @IsString()
        address?: string;
}
