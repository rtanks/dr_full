import { PartialType } from '@nestjs/swagger';
import { CreateUserMessageDto } from './create-user-message.dto';

export class UpdateUserMessageDto extends PartialType(CreateUserMessageDto) {}
