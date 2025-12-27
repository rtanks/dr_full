import z from "zod";
import Button from "./Button";
import { Input, InputWithLabel } from "../request/Inputs";
import { useForm } from "react-hook-form";
import TextError from "../request/TextError";
import { zodResolver } from "@hookform/resolvers/zod";
import loginService from "../../services/api/loginService";
import { useState } from "react";
import CompleteTitle from "../CompleteTitle";
import Calender from "./date.picker/Calender";
import SetProvinces from "./SetProvinces";
import SetCities from "./SetCity";
import { useNavigate } from "react-router-dom";
import { getReagentCode } from "../../services/func/getTypeRequest";

const schema = z.object({
    fullName: z.string().nonempty('این فیلد الزامی است'),
    nationalCode: z.string().nonempty('این فیلد الزامی است').length(10, 'کد ملی وارد شده معتبر نیست'),
    phoneNumber: z.string().nonempty('این فیلد الزامی است').regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست").length(11, 'شماره تلفن وارد شده معتبر نیست'),
    province: z.string().optional(),
    city: z.string().optional(),
    birthday: z.string().optional(),
    regentCode: z.string().optional(),
}).refine(
    async (val) => val.fullName.split(' ').filter(n => n.length > 0).length >= 2, 
    {message: 'نام و نام خانوادگی وارد شده معتبر نیست', path: ['fullName']}
);

export default function AddUserModal({close}) {
    const navigate = useNavigate();
    const [birthday, setBirthday] = useState('')
    const [province, setProvince] = useState({
      id: 0,
      name: "",
      slug: "",
      tel_prefix: "",
    });
    const {register,handleSubmit, setValue, watch, getFieldState, control, formState:{errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            nationalCode: '',
            phoneNumber: '',
            province: "",
            city: "",
            birthday: "",
        }
    })
    const getFieldStateValue = () => {
        const {invalid} = getFieldState('nationalCode', control);
        return !invalid;
    }
    const getDataForForm = (key, value) => {
        console.log(key,value)
        setValue(key, value)
    }
    const getBirthday = (value) => {
        console.log(value)
        setBirthday(value)
        setValue('birthday', value)
    }
    
    const {registerMutation} = loginService();
    
    const onSubmit = (data) => {
        console.log(data);
        registerMutation.mutateAsync(data).then(res => navigate('/profile'));
    }
    return (
        <div onClick={close} className="w-full h-full fixed flex justify-center left-0 top-0 bg-[#0009] z-50">
            <div onClick={(e) => e.stopPropagation()} className="w-[90%] sm:w-[30%] border-t-4 border-t-main h-max mt-10 sm:items-center rounded-xl bg-white flex flex-col gap-2 p-5">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full sm:p-5 sm:items-center rounded-xl bg-white flex flex-col gap-2">
                    <CompleteTitle title={' برای ثبت بیمار اطلاعات زیر را وارد کنید'}/>
                    <div className="w-full h-max flex flex-col gap-1">
                        <div className='w-full'>
                            <InputWithLabel  type={'text'} label={'نام و نام خانوادگی'} readonly={false}
                                placeholder={"مثال : اشکان حسنوندی"} register={register('fullName')} 
                                hasError={errors.fullName} isValid={watch('fullName') ? getFieldStateValue('fullName'): false}/>
                            {errors.fullName && <TextError message={errors.fullName.message}/>}
                        </div>
                        <div className='w-full'>
                            <InputWithLabel label={'کد ملی '} mode={'numeric'} placeholder={"مثال : 1234567890"} maxLength={10}
                                register={register('nationalCode')} isValid={watch('nationalCode') ? getFieldStateValue('nationalCode') : false} 
                                hasError={errors.nationalCode}/>
                            {errors.nationalCode && <TextError message={errors.nationalCode.message}/>}
                        </div> 
                        <div className='w-full'>
                            <InputWithLabel label={'شماره تلفن'} mode={'numeric'} placeholder={'09xxxxx8765'} maxLength={11}
                                register={register('phoneNumber')} isValid={watch('phoneNumber') ? getFieldStateValue('phoneNumber') : false} 
                                hasError={errors.phoneNumber}/>
                            {errors.phoneNumber && <TextError message={errors.phoneNumber.message}/>}
                        </div> 
                        <div className='w-full'>
                            <Calender getDate={getBirthday} initialDate={birthday} placeholder={'تاریخ تولد'}/>
                            {errors.birthday && <TextError message={errors.birthday.message}/>}
                        </div> 

                        <div className="w-full h-max flex flex-row items-center gap-2 mt-2">
                            <SetProvinces 
                                setData={getDataForForm}
                                setProvince={setProvince}
                                province={province.name}
                            />
                            <SetCities
                                setData={getDataForForm}
                                province={province}
                            />
                        </div>
                    </div>
                    <Button text={'ثبت کاربر'} disable={!isValid}  isSubmitting={registerMutation.isPending} textSubmitting={"در حال ارسال اطلاعات"}/>
                </form>
            </div>
        </div>
    )
}