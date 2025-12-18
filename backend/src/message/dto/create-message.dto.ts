import { IsArray, IsEnum, IsMongoId, IsString, ValidateNested } from "class-validator";
import { MessageType } from "../entities/message.entity";
class ContentMessageDto {
    @IsString()
    type: string;

    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsString()
    link: string;
}
export class CreateMessageDto {
}
