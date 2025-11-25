import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class User {
    @Prop()
    fullName: string;

    @Prop()
    nationalCode: string;

    @Prop()
    phoneNumber: string;

    @Prop({default: ''})
    province?: string;

    @Prop({default: ''})
    city?: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);