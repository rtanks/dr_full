import { useForm } from "react-hook-form";
import TestHeader from "../generalComponent/HeaderTest";
import InputWithLabel from "../generalComponent/InputWithLabel";
import TextAreaWithLabel from "../generalComponent/TextAreaWithLabel";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import classNames from "classnames";
import SubmitButtonFixed from "../generalComponent/SubmitButtonFixed";
import ContainerDrawer from "../generalComponent/ContainerDrawer";
import recordDoctorService from "../../services/api/dashboard.api/recordDoctorService";
import CompleteOrderStepOne from "./CompleteOrderStepOne";

const schema = z.object({
        fullName: z.string().nonempty("وارد کردن این فیلد الزامی است"),
        phoneNumber: z.string().nonempty("وارد کردن این فیلد الزامی است").regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست"),
        nationalCode: z.string().nonempty("وارد کردن این فیلد الزامی است").max(10, "کد ملی وارد شده معتبر نیست").min(10, "کد ملی وارد شده معتبر نیست"),
        medicalSystem: z.string().optional(),
        address: z.string().optional(),
        subSpecialty: z.string().optional(),
        specialty: z.string().optional(),
        // specialties: z.preprocess((val) => {
        //     if (typeof val === 'string') {
        //       return val.split(',').map(s => s.trim()).filter(Boolean);
        //     }
        //     return val;
        // },z.array(z.string().nonempty("وارد کردن این فیلد الزامی است")).nonempty("وارد کردن این فیلد الزامی است")),
        province: z.string().optional(),
        city: z.string().optional(),
        lastGraduationYear: z.string().optional(),
        lastUniversity: z.string().optional(),
        aboutMe: z.string().optional()
    });
export default function CreateNeedForAction({doctor, onClick}) {
    const [flag, setFlag] = useState(false);
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            // fullName: doctor.fullName || "",
            // phoneNumber: doctor.phoneNumber || "",
            // nationalCode: doctor.nationalCode || "",
            // medicalSystem: doctor.medicalSystem || "",
            // subSpecialty: doctor.subSpecialty || "",
            // specialty: doctor.specialty || "",
            // province: doctor.province || "",
            // lastUniversity: doctor.lastUniversity || "",
            // city: doctor.city || "",
            // aboutMe: doctor.aboutMe || ""
        }
    });
    const disabledClass = classNames({
        "bg-[#006ECF] text-white": flag,
        "bg-gray-200 text-gray-500": !flag,
      });
    useEffect(() => {
        console.log(flag)
        console.log(isValid)
    }, [flag, isValid])
    const {editDoctorMutation} = recordDoctorService()
    const onSubmit = (data) => {
        console.log({id: doctor._id ,data:{...data, medicalSystem: Number(data.medicalSystem)}})
        editDoctorMutation.mutate({id: doctor._id ,data:{...data, medicalSystem: Number(data.medicalSystem)}})
    }
    return (
        <ContainerDrawer onClick={onClick} header={"ایجاد اقدام"}>
            <CompleteOrderStepOne/>
        </ContainerDrawer>
    )
}

