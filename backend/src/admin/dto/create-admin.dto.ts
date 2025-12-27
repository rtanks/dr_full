import { IsString } from "class-validator";


export class CreateAdminDto {
    @IsString()
    nationalCode: string;

    @IsString()
    password: string;
}
