import { Optional } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({timestamps: true})
export class Payment {
    @Prop({type: Types.ObjectId, ref: 'User'})
    userId: Types.ObjectId;

    @Prop()
    amount: number;

    @Prop()
    description: string;

    @Prop()
    authority?: string;

    @Prop({default: 'pending'})
    status?: string;

    @Prop()
    refId?: number;

    @Prop()
    message?: string;

    @Prop()
    code?: number;

    @Prop({default: false})
    payed?: boolean;

    @Prop()
    verifyAt?: Date;
}
export type PaymentDocument = HydratedDocument<Payment>;
export const PaymentSchema = SchemaFactory.createForClass(Payment);