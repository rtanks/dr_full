import z from "zod";
import Button from "../general/Button";
import { Input } from "../request/Inputs";
import { useForm } from "react-hook-form";
import TextError from "../request/TextError";
import { zodResolver } from "@hookform/resolvers/zod";
import loginService from "../../services/api/loginService";

const schema = z.object({
    nationalCode: z.string().nonempty('این فیلد الزامی است').length(10, 'کد ملی وارد شده معتبر نیست'),
})

export default function Login({changeItemShow}) {
    const {register,handleSubmit, watch, getFieldState, control, formState:{errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            nationalCode: '',
        }
    })
    const getFieldStateValue = () => {
        const {invalid} = getFieldState('nationalCode', control);
        return !invalid;
    }
    const {loginMutation} = loginService();
    
    const onSubmit = (data) => {
        console.log(data);
        loginMutation.mutate(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col gap-5 mx-auto items-center justify-start">
                <div className="w-full h-max flex flex-col gap-1">
                    <Input register={register('nationalCode')} mode={'numeric'} isValid={watch('nationalCode')? getFieldStateValue(): false} hasError={errors.nationalCode} type={'text'} placeholder={'کدملی'}/>
                    {errors.nationalCode && <TextError message={errors?.nationalCode?.message}/>}
                </div>
                <Button text={'ورود'} isSubmitting={loginMutation.isPending} disable={!isValid} textSubmitting={"در حال ارسال اطلاعات"}/>
            </form>
            <div className='w-full h-max'>
                <p className='text-sm text-a7a7a7 mt-1'>حساب کاربری ندارید؟ برای ایجاد حساب کاربری کلیک کنید</p>
                <button type='button' onClick={() => changeItemShow('register')} className='w-full h-12 mt-3 border-[1.6px] rounded-lg border-[#D1D5DB] text-[#B1B5BB]'>ایجاد حساب کاربری</button>
            </div>
        </>
    )
}