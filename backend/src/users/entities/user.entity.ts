import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class User {
    @Prop()
    fullName: string;

    @Prop()
    nationalCode: string;

    @Prop({default: ''})
    phoneNumber: string;

    @Prop({default: ''})
    province: string;

    @Prop({default: ''})
    city: string;

    @Prop({default: ''})
    insurance: string;
}
export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);