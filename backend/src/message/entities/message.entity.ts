import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export enum MessageType {
    system = "system",
    modal = "modal",
    sms = "sms"
}
@Schema()
export class Message {
    @Prop({type: [Types.ObjectId], ref: 'User'})
    usersId: Types.ObjectId[];

    @Prop({type: String , enum: MessageType})
    type: string;

    @Prop()
    title: string;

    @Prop()
    link: string;

    @Prop()
    text: string;
    
}
export type MessageDocument = HydratedDocument<Message>
export const MessageSchema = SchemaFactory.createForClass(Message)