import InputWithLabel from "../generalComponent/InputWithLabel";
import TextAreaWithLabel from "../generalComponent/TextAreaWithLabel";
import ContainerDrawer from "../generalComponent/ContainerDrawer";
import SubmitButtonFixed from "../generalComponent/SubmitButtonFixed";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import patientService from "../../services/api/dashboard.api/patientService";

const schema = z.object({
    fullName: z.string().nonempty("وارد کردن این فیلد الزامی است"),
    phoneNumber: z.string().nonempty("وارد کردن این فیلد الزامی است").regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست"),
    nationalCode: z.string().nonempty("وارد کردن این فیلد الزامی است").max(10, "کد ملی وارد شده معتبر نیست").min(10, "کد ملی وارد شده معتبر نیست"),
    aboutMe: z.string(),
})

export default function PatientCreate({onClick}) {
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            nationalCode: "",
            aboutMe: "",
        }
    })
    const {createUserMutation} = patientService()
    const onSubmit = (data) => {
        console.log(data)
        const {aboutMe, ...mainData} = data;
        console.log(mainData);
       createUserMutation.mutate(mainData)
    }
    return (
        <ContainerDrawer header={"ایجاد کاربر"} onClick={onClick}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-[90%] h-max mx-auto flex flex-col gap-6 mb-24">
                <div className="flex flex-row items-center gap-3.5s">
                    <div className="w-[62px] h-[62px] text-xs bg-[#d9d9d9] rounded-full"></div>
                    <span className="text-[16px] text-[#5f5f5f]">تصویر پروفایل</span>
                </div>
                <InputWithLabel register={register('fullName')} label={"نام و نام خانوادگی"} type={"text"} />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                <InputWithLabel register={register('phoneNumber')} label={"شماره همراه"} type={"text"} />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                <InputWithLabel register={register('nationalCode')} label={"کدملی"} type={"text"} />
                {errors.nationalCode && <p className="text-red-500 text-sm">{errors.nationalCode.message}</p>}
                <TextAreaWithLabel register={register('aboutMe')} label={"درباره من "} type={"text"} styleI={"w-full h-[212px]"}/>
                {errors.aboutMe && <p className="text-red-500 text-sm">{errors.aboutMe.message}</p>}
                <SubmitButtonFixed title={"ثبت اطلاعات"} title2={'در حال ثبت اطلاعات...'} isSubmitting={createUserMutation.isPending} additionalStyle={"bg-[#E9E9E9] text-[#676767] border-none"} disabled={false}/>
            </form>
        </ContainerDrawer>
    )
}