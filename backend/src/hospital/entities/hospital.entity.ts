import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema({timestamps: true})
export class Hospital {
    @Prop({type: Types.ObjectId, ref:'Doctor'})
    doctorId: Types.ObjectId;

    // @Prop({type: Object})
    // usersId?: string;

    @Prop({default: true})
    activate?: boolean;
}
export type HospitalDocument = HydratedDocument<Hospital>
export const HospitalSchema = SchemaFactory.createForClass(Hospital);
