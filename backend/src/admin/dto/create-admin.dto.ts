import { IsString } from "class-validator";


export class CreateAdminDto {
    @IsString()
    phoneNumber: string;

    @IsString()
    password: string;
}
