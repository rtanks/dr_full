import { IsBoolean, IsMongoId, IsOptional } from "class-validator";

export class CreateHospitalDto {
    @IsMongoId()
    doctorId: string;

    @IsBoolean()
    @IsOptional()
    activate?: boolean;
}
