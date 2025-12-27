import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema({timestamps: true, })
export class Request {
    @Prop({type: Types.ObjectId, ref: 'User'})
    userId: string;

    @Prop()
    category: string;
    //category includes -> transport, medicine, test, paraClinic, equipment, nurse, triage

    @Prop({type: Object})
    request: any;
    
    @Prop({default: 'pending'})
    statusPay?: string;
    //success | failed | pending

    @Prop({type: Types.ObjectId, ref: "Payment", default: ""})
    transactionId?: string;
}
export type RequestDocument = HydratedDocument<Request>;
export const RequestSchema = SchemaFactory.createForClass(Request);