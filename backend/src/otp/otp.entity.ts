import { Optional } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class Otp {
    @Prop()
    code: number;

    @Prop()
    phoneNumber: string;

    @Prop({type: Date, expires: 120})//2 minute
    expiresAt: Date;

    @Prop({default: false})
    @Optional()
    used?: boolean;
}
export type OtpDocument = HydratedDocument<Otp>
export const OtpSchema = SchemaFactory.createForClass(Otp);