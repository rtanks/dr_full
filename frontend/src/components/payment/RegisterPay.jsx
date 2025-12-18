import z from "zod";
import Button from "../general/Button";
import { Input, InputWithLabel } from "../request/Inputs";
import { useForm } from "react-hook-form";
import TextError from "../request/TextError";
import { zodResolver } from "@hookform/resolvers/zod";
import loginService from "../../services/api/loginService";
import SelectElem from "../general/SelectElem";
import {shahr, ostan} from "iran-cities-json";
import { useState } from "react";
import registerRequestService from "../../services/api/registerRequestService";
import LoadingGateway from "./LoadingGateway";
import { getReagentCode, getTypeRequest } from "../../services/func/getTypeRequest";
import Calender from "../general/Calender";
import SetProvinces from "../general/SetProvinces";
import SetCities from "../general/SetCity";

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

export default function RegisterPay({phoneNumber}) {
    const [modal, setModal] = useState(false);
    const [province, setProvince] = useState({
      id: 0,
      name: "",
      slug: "",
      tel_prefix: "",
    });
    const [loading, setLoading] = useState(false);
    const {register,handleSubmit, setValue, watch, getFieldState, control, formState:{errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            fullName: '',
            nationalCode: '',
            phoneNumber: phoneNumber,
            province: "",
            city: "",
            birthday: "",
            regentCode: getReagentCode(),
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
    const {registerMutation} = loginService();
    const {transitionToGatewayMutation} = registerRequestService();
    const onSubmit = (data) => {
        console.log(data);
        registerMutation.mutateAsync(data).then(res => {
            console.log('hi')
            setLoading(true)
            transitionToGatewayMutation.mutateAsync({amount: 260000, description: getTypeRequest()}).then(res => {
                setLoading(false)
            })
        });
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full flex flex-col gap-5 mx-auto items-center justify-start">
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
                        <Calender title="تاریخ تولد"
                            name="constructionDate"
                            setModal={setModal}
                            modal={modal}
                            set={getDataForForm}
                            style={'w-full'}
                            />
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
                <div className='w-full'>
                    <InputWithLabel label={'کد معرف'} mode={'numeric'} placeholder={getReagentCode()} maxLength={10}
                        register={register('regentCode')} isValid={watch('regentCode') ? getFieldStateValue('regentCode') : false} 
                        hasError={errors.regentCode}/>
                    {errors.regentCode && <TextError message={errors.regentCode.message}/>}
                </div>
                <Button text={'ثبت کاربر'}  disable={!isValid} textSubmitting={"در حال ارسال اطلاعات"}/>
            </form>
            {loading && <LoadingGateway amount={260000}/>} 
        </>
    )
}