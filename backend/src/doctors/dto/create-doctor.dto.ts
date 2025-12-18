import { IsNumber, IsString, IsOptional, Length, IsBoolean } from "class-validator";

export class CreateDoctorDto {
    @IsString()
    fullName: string;

    @IsString()
    @Length(11,11, {message: "شماره همراه معتبر نیست"})
    phoneNumber: string;

    @IsString()
    @Length(10,10, {message: "کد ملی معتبر نیست"})
    nationalCode: string;

    @IsString()
    @IsOptional()
    medicalSystem: string;

    @IsString()
    @IsOptional()
    subSpecialty: string;

    @IsString()
    @IsOptional()
    specialty: string;

    @IsString()
    @IsOptional()
    province: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    lastGraduationYear: string;

    @IsString()
    @IsOptional()
    lastUniversity: string;

    @IsString()
    @IsOptional()
    aboutMe: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
}

