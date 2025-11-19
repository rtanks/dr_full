import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


@Schema()
export class Reagent {
    @Prop()
    fullName: string;

    @Prop()
    nationalCode: string;

    @Prop()
    phoneNumber: string;

    @Prop() 
    code: string;
}
export type ReagentDocument = HydratedDocument<Reagent>;
export const ReagentSchema = SchemaFactory.createForClass(Reagent);