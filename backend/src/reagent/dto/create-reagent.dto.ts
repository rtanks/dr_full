import { IsString } from "class-validator";


export class CreateReagentDto {
    @IsString()
    fullName: string;

    @IsString()
    nationalCode: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    code: string;
}
