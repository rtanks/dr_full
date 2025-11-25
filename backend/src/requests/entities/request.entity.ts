import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({timestamps: true, })
export class Request {
    @Prop({type: Types.ObjectId, ref: 'User'})
    userId: Types.ObjectId;

    @Prop({type: Object})
    request: any;
    
    @Prop({default: false})
    statusPay: boolean;

    @Prop({type: Types.ObjectId, ref: "Payment"})
    transactionId: Types.ObjectId;
}
export type RequestDocument = HydratedDocument<Request>;
export const RequestSchema = SchemaFactory.createForClass(Request);