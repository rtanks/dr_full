import z from "zod";
import Button from "../general/Button";
import { Input } from "../request/Inputs";
import { useForm } from "react-hook-form";
import TextError from "../request/TextError";
import { zodResolver } from "@hookform/resolvers/zod";
import loginService from "../../services/api/loginService";

const schema = z.object({
    fullName: z.string().nonempty('این فیلد الزامی است').min(5, 'نام و نام خانوادگی باید حداقل ۵ کاراکتر باشد'),
    nationalCode: z.string().nonempty('این فیلد الزامی است').length(10, 'کد ملی وارد شده معتبر نیست'),
    phoneNumber: z.string().nonempty('این فیلد الزامی است').regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست").length(11, 'شماره تلفن وارد شده معتبر نیست'),
})

export default function Register({changeItemShow}) {
    const {register,handleSubmit, watch, getFieldState, control, formState:{errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            nationalCode: '',
            phoneNumber: '',
        }
    })
    const getFieldStateValue = () => {
        const {invalid} = getFieldState('nationalCode', control);
        return !invalid;
    }
    const {registerMutation} = loginService();
    
    const onSubmit = (data) => {
        console.log(data);
        // registerMutation.mutate(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col gap-5 mx-auto items-center justify-start">
                <div className="w-full h-max flex flex-col gap-1">
                    <Input register={register('fullName')} isValid={watch('fullName')? getFieldStateValue(): false} hasError={errors.fullName} type={'text'} placeholder={'نام و نام خانوادگی'}/>
                    {errors.fullName && <TextError message={errors?.fullName?.message}/>}
                    
                    <Input register={register('nationalCode')} mode={'numeric'} isValid={watch('nationalCode')? getFieldStateValue(): false} hasError={errors.nationalCode} type={'text'} placeholder={'کدملی'}/>
                    {errors.nationalCode && <TextError message={errors?.nationalCode?.message}/>}
                    
                    <Input register={register('phoneNumber')} mode={'numeric'} isValid={watch('phoneNumber')? getFieldStateValue(): false} hasError={errors.phoneNumber} type={'text'} placeholder={'شماره تماس'}/>
                    {errors.phoneNumber && <TextError message={errors?.phoneNumber?.message}/>}
                </div>
                <Button text={'ثبت کاربر'} isSubmitting={registerMutation.isPending} disable={!isValid} textSubmitting={"در حال ارسال اطلاعات"}/>
            </form>
            <div className='w-full h-max'>
                <p className='text-sm text-a7a7a7 mt-1'>اگر پیش‌تر حساب کاربری ایجاد کرده‌اید، از این بخش وارد شوید</p>
                <button type='button' onClick={() => changeItemShow('login')} className='w-full h-12 mt-3 border-[1.6px] rounded-lg border-[#D1D5DB] text-[#B1B5BB]'>ورود به حساب کاربری</button>
            </div>
        </>
    )
}