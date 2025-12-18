import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({timestamps: true})
export class Doctor {
    @Prop()
    fullName: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    nationalCode: string;

    @Prop()
    medicalSystem?: string;

    @Prop()
    subSpecialty?: string;

    @Prop()
    specialty?: string;

    @Prop()
    province?: string;

    @Prop()
    city?: string;

    @Prop()
    lastGraduationYear?: string;

    @Prop()
    lastUniversity?: string;

    @Prop()
    aboutMe?: string;

    @Prop()
    password: string;
    
    @Prop({default: false})
    isActive?: boolean; 
}
export type DoctorDocument = HydratedDocument<Doctor>;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
