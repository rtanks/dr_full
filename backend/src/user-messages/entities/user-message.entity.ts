import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({timestamps: true})
export class UserMessage {
    @Prop({type: Types.ObjectId, ref: 'Message'})
    userId: Types.ObjectId;

    @Prop({type: Types.ObjectId, ref: 'User'})
    messageId: Types.ObjectId;

    @Prop()
    type: string;

    @Prop()
    status: string;
}
export type UserMessageDocument = HydratedDocument<UserMessage>
export const UserMessageSchema = SchemaFactory.createForClass(UserMessage);