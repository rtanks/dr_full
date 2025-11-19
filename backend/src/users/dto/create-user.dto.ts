import { IsString , IsOptional, Min, Length} from 'class-validator'
export class CreateUserDto {
    @IsString()
    fullName: string;

    @IsString()
    @Length(10,10, {message: "کد ملی شما معتبر نیست"})
    // @Min(10, {message: "کد ملی شما معتبر نیست"})
    nationalCode: string;

    @IsString()
    @IsOptional()
    @Length(11, 11, {message: 'شماره تلفن شما معتبر نیست'})
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    province: string;
    
    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    insurance: string;
}
