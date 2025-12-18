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

export default function RecordDoctorUser({onClick}) {
    const {registerDoctorMutation} = recordDoctorService();
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            nationalCode: "",
            medicalSystem: "",
            subSpecialty: '',
            // specialty: [],//this is an array
            specialty: "",
            province: "",
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
        console.log({...data})
        registerDoctorMutation.mutate({...data})
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
                <InputWithLabel register={register("medicalSystem")} label={"شماره نظام پزشکی / روانشناسی"} type={"text"} />
                {errors.medicalSystem && <p className="text-red-500 text-sm">{errors.medicalSystem.message}</p>}
                <InputWithLabel register={register("subSpecialty")} label={"فوق تخصص / فلوشیپ"} type={"text"} />
                {errors.subSpecialty && <p className="text-red-500 text-sm">{errors.subSpecialty.message}</p>}
                <InputWithLabel register={register("specialty")} label={"تخصص"} type={"text"} />
                {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty.message}</p>}
                <InputWithLabel register={register("province")} label={"استان"} type={"text"} />
                {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
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