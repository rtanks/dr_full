import { useForm } from "react-hook-form";
import TestHeader from "../generalComponent/HeaderTest";
import InputWithLabel from "../generalComponent/InputWithLabel";
import TextAreaWithLabel from "../generalComponent/TextAreaWithLabel";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import classNames from "classnames";
import SubmitButtonFixed from "../generalComponent/SubmitButtonFixed";
import ContainerDrawer from "../generalComponent/ContainerDrawer";

const schema = z.object({
        phoneNumber: z.string().nonempty("وارد کردن این فیلد الزامی است").regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست"),
        nationalCode: z.string().nonempty("وارد کردن این فیلد الزامی است").max(10, "کد ملی وارد شده معتبر نیست").min(10, "کد ملی وارد شده معتبر نیست"),
        degree: z.string(),
        province: z.string(),
        city: z.string(),
        aboutMe: z.string()
    });
export default function UserDoctorEdit({doctor, onClick}) {
    const [flag, setFlag] = useState(false);
    const {register, handleSubmit, formState: {errors,isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            phoneNumber: doctor.user_PhoneNumber,
            nationalCode: "",
            degree: doctor.degree,
            province: "",
            city: doctor.city,
            aboutMe: ""
        }
    });
    const disabledClass = classNames({
        "bg-[#006ECF] text-white": isValid && flag,
        "bg-gray-200 text-gray-500": !isValid,
      });
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <ContainerDrawer onClick={onClick} header={"ویرایش کاربر"}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] h-max mx-auto flex flex-col gap-6 mb-5">
                <div className="flex flex-row items-center gap-[14px]">
                    <div className="w-[62px] h-[62px] text-xs bg-[#d9d9d9] rounded-full"></div>
                    <span className="text-[16px] text-[#5f5f5f]">تصویر پروفایل</span>
                </div>
                <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.phoneNumber} register={register("phoneNumber")} label={"شماره همراه"} type={"text"} />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.nationalCode} register={register("nationalCode")} label={"کد ملی"} type={"text"} />
                {errors.nationalCode && <p className="text-red-500 text-sm">{errors.nationalCode.message}</p>}
                <InputWithLabel flag={flag} error={false} label={"شماره نظام پزشکی / روانشناسی"} type={"text"} />
                <InputWithLabel flag={flag} error={false} label={"فوق تخصص / فلوشیپ"} type={"text"} />
                <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.degree} register={register("degree")} label={"تخصص"} type={"text"} />
                {errors.degree && <p className="text-red-500 text-sm">{errors.degree.message}</p>}
                <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.province} register={register("province")} label={"استان"} type={"text"} />
                {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
                <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.city} register={register("city")} label={"شهر"} type={"text"} />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                <InputWithLabel label={"سال آخرین فارغ التحصیلی"} type={"text"} />
                <InputWithLabel label={"آخرین دانشگاه محل تحصیل"} type={"text"} />
                <TextAreaWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.aboutMe} register={register("aboutMe")} label={"درباره من "} type={"text"} styleI={"w-[361px] h-[241px]"}/>
                {errors.aboutMe && <p className="text-red-500 text-sm">{errors.aboutMe.message}</p>}
                <SubmitButtonFixed title={"ثبت اطلاعات"} additionalStyle={disabledClass} disabled={!(flag && isValid)}/>
            </form>
        </ContainerDrawer>
    )
}




//   <div onClick={onClick} className="w-full h-full bg-[#0004] vazir-medium fixed left-0 top-0 z-50 overflow-y-scroll">
//             <div onClick={(e) => e.stopPropagation()} className="w-full sm:w-[402px] h-max bg-white mr-auto pb-10">
//                 <TestHeader title={"ویرایش کاربر"} onClick={onClick}/>
//                 <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] h-max mx-auto flex flex-col gap-6 mb-5">
//                     <div className="flex flex-row items-center gap-[14px]">
//                         <div className="w-[62px] h-[62px] text-xs bg-[#d9d9d9] rounded-full"></div>
//                         <span className="text-[16px] text-[#5f5f5f]">تصویر پروفایل</span>
//                     </div>
//                     <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.phoneNumber} register={register("phoneNumber")} label={"شماره همراه"} type={"text"} />
//                     {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
//                     <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.nationalCode} register={register("nationalCode")} label={"کد ملی"} type={"text"} />
//                     {errors.nationalCode && <p className="text-red-500 text-sm">{errors.nationalCode.message}</p>}
//                     <InputWithLabel flag={flag} error={false} label={"شماره نظام پزشکی / روانشناسی"} type={"text"} />
//                     <InputWithLabel flag={flag} error={false} label={"فوق تخصص / فلوشیپ"} type={"text"} />
//                     <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.degree} register={register("degree")} label={"تخصص"} type={"text"} />
//                     {errors.degree && <p className="text-red-500 text-sm">{errors.degree.message}</p>}
//                     <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.province} register={register("province")} label={"استان"} type={"text"} />
//                     {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
//                     <InputWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.city} register={register("city")} label={"شهر"} type={"text"} />
//                     {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
//                     <InputWithLabel label={"سال آخرین فارغ التحصیلی"} type={"text"} />
//                     <InputWithLabel label={"آخرین دانشگاه محل تحصیل"} type={"text"} />
//                     <TextAreaWithLabel flag={flag} onChange={() => setFlag(true)} error={errors.aboutMe} register={register("aboutMe")} label={"درباره من "} type={"text"} styleI={"w-[361px] h-[241px]"}/>
//                     {errors.aboutMe && <p className="text-red-500 text-sm">{errors.aboutMe.message}</p>}
//                     <SubmitButtonFixed title={"ثبت اطلاعات"} additionalStyle={disabledClass} disabled={!(flag && isValid)}/>
//                 </form>
//             </div>
//         </div>