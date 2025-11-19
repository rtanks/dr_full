import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Request {
    @Prop()
    userId: string;

    @Prop()
    service: string;

    @Prop({default: 0})
    price: number;

    @Prop()
    explain: string;

    @Prop({default: ''})
    center: string;
}
export type RequestDocument = HydratedDocument<Request>;
export const RequestSchema = SchemaFactory.createForClass(Request);