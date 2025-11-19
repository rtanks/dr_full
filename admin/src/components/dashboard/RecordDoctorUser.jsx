import { useForm } from "react-hook-form";
import InputWithLabel from "../generalComponent/InputWithLabel";
import TextAreaWithLabel from "../generalComponent/TextAreaWithLabel";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import classNames from "classnames";
import recordDoctorService from "../../services/api/dashboard.api/recordDoctorService";
import ContainerDrawer from "../generalComponent/ContainerDrawer";
import SubmitButtonFixed from "../generalComponent/SubmitButtonFixed";

const schema = z.object({
    fullName: z.string().nonempty("وارد کردن این فیلد الزامی است"),
    phoneNumber: z.string().nonempty("وارد کردن این فیلد الزامی است").regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست"),
    nationalCode: z.string().nonempty("وارد کردن این فیلد الزامی است").max(10, "کد ملی وارد شده معتبر نیست").min(10, "کد ملی وارد شده معتبر نیست"),
    degree: z.string(),
    medicalRegistrationNumber: z.string(),
    address: z.string(),
    specialties: z.preprocess((val) => {
        if (typeof val === 'string') {
          return val.split(',').map(s => s.trim()).filter(Boolean);
        }
        return val;
    },z.array(z.string().nonempty("وارد کردن این فیلد الزامی است")).nonempty("وارد کردن این فیلد الزامی است")),
    city: z.string(),
    lastGraduationYear: z.string(),
    lastUniversity: z.string(),
    aboutMe: z.string()
});

export default function RecordDoctorUser({onClick}) {
    const {recordDoctorMutation} = recordDoctorService();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            nationalCode: "",
            degree: "",
            medicalRegistrationNumber: "",
            specialties: [],//this is an array
            address: "",
            city: "",
            lastGraduationYear: "",
            lastUniversity: "",
            aboutMe: ""
        }
    })
    const disabledClass = classNames({
        "bg-[#006ECF] text-white border-none": isValid,
        "bg-gray-200 text-gray-500 border-none": !isValid,
    });

    const onSubmit = (data) => {
        console.log(data)
        console.log({...data, role: "doctor"})
        recordDoctorMutation.mutate({...data, lastGraduationYear: Number(data.lastGraduationYear), role: "doctor"})
        onClick();
    }
    return (
        <ContainerDrawer onClick={onClick} header={"ثبت کاربر"}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] h-max mx-auto flex flex-col gap-6 mb-5">
                <div className="flex flex-row items-center gap-[14px]">
                    <div className="w-[62px] h-[62px] text-xs bg-[#d9d9d9] rounded-full"></div>
                    <span className="text-[16px] text-[#5f5f5f]">تصویر پروفایل</span>
                </div>
                <InputWithLabel register={register("fullName")} label={"نام و نام خانوادگی"} type={"text"} />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                <InputWithLabel register={register("phoneNumber")} label={"شماره همراه"} type={"text"} />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                <InputWithLabel register={register("nationalCode")} label={"کد ملی"} type={"text"} />
                {errors.nationalCode && <p className="text-red-500 text-sm">{errors.nationalCode.message}</p>}
                <InputWithLabel register={register("medicalRegistrationNumber")} label={"شماره نظام پزشکی / روانشناسی"} type={"text"} />
                {errors.medicalRegistrationNumber && <p className="text-red-500 text-sm">{errors.medicalRegistrationNumber.message}</p>}
                <InputWithLabel register={register("specialties")} label={"فوق تخصص / فلوشیپ"} type={"text"} />
                {errors.specialties && <p className="text-red-500 text-sm">{errors.specialties.message}</p>}
                <InputWithLabel register={register("degree")} label={"تخصص"} type={"text"} />
                {errors.degree && <p className="text-red-500 text-sm">{errors.degree.message}</p>}
                <InputWithLabel register={register("address")} label={"استان"} type={"text"} />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                <InputWithLabel register={register("city")} label={"شهر"} type={"text"} />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                <InputWithLabel register={register("lastGraduationYear")} label={"سال آخرین فارغ التحصیلی"} type={"text"} />
                {errors.lastGraduationYear && <p className="text-red-500 text-sm">{errors.lastGraduationYear.message}</p>}
                <InputWithLabel register={register("lastUniversity")} label={"آخرین دانشگاه محل تحصیل"} type={"text"} />
                {errors.lastUniversity && <p className="text-red-500 text-sm">{errors.lastUniversity.message}</p>}
                <TextAreaWithLabel register={register("aboutMe")} label={"درباره من "} type={"text"} styleI={"w-[361px] h-[241px]"}/>
                {errors.aboutMe && <p className="text-red-500 text-sm">{errors.aboutMe.message}</p>}
                <SubmitButtonFixed title={"ثبت اطلاعات"} additionalStyle={`${disabledClass}`}/>
            </form>
        </ContainerDrawer>
    )
}