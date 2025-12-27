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
import { provinces } from "../../constant/city&province";
import { useSelector } from "react-redux";
import {motion} from 'framer-motion';
import MapAndAddress from "./MapAndAddress";
import { useQueryClient } from "@tanstack/react-query";

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

export default function EditUserModal({close}) {
    const userInfo = useSelector(state => state.request);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [birthday, setBirthday] = useState('')
    const [location, setLocation] = useState(userInfo.location || {})
    const [address, setAddress] = useState(userInfo.address || "")
    const [province, setProvince] = useState(() => {
      if(userInfo.province) {
            return provinces.find(p => p.name == userInfo.province)
      } else {
        return (
          {
            id: 25,
            name: "لرستان",
            slug: "لرستان",
            tel_prefix: "066",
          }
        )
      }
    });
    console.log(userInfo)
    const {register,handleSubmit, setValue, watch, getFieldState, control, formState:{errors, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            fullName: userInfo.fullName || '',
            nationalCode: userInfo.nationalCode || '',
            phoneNumber: userInfo.phoneNumber || '',
            province: userInfo.province || "",
            city: userInfo.city || "",
            birthday: userInfo.birthday || "",
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
    
    const {editMutation} = loginService();
    
    const onSubmit = (data) => {
        console.log(data);
        console.log(location, address)
        editMutation.mutateAsync({...data, location: location, address: address}).then(res => {queryClient.invalidateQueries({queryKey: ['user']}); close()});
    }
    return (
        <div onClick={close} className="w-full h-full fixed flex justify-center items-end sm:items-start overflow-y-scroll left-0 top-0 bg-[#0009] z-50">
            <motion.div onClick={(e) => e.stopPropagation()} animate={{translateY: [600, 1], transition: {duration: 1}}}
                className="w-full sm:w-[60%] border-t-4 border-t-main h-4/5 mb-0 sm:mt-10 sm:items-center rounded-t-xl overflow-y-scroll sm:rounded-xl bg-white flex flex-col gap-2 p-5">
                <CompleteTitle title={' برای ثبت بیمار اطلاعات زیر را وارد کنید'}/>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full rounded-xl pb-7 sm:pb-0 bg-white flex flex-col sm:flex-wrap gap-2">
                    <div className="w-full h-max sm:w-2/5 order-1 flex flex-col gap-1">
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
                        <div className='w-full mt-2'>
                            <Calender getDate={getBirthday} initialDate={userInfo.birthday} placeholder={'تاریخ تولد'}/>
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
                                data={userInfo.city}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-3/5 h-[250px] sm:h-full order-2 sm:order-3 relative">
                        <MapAndAddress
                        getAddress={(ads) => setAddress(ads)}
                        getLocation={(loc) => setLocation(loc)} 
                        style={"w-full h-[250px] sm:h-[80%]"} 
                        initialLocation={userInfo.location}/>
                    </div>
                    <div className="order-3 sm:order-2 mt-10 mb-10">
                        <Button text={'ویرایش اطلاعات'} disable={!isValid} isSubmitting={editMutation.isPending} 
                        textSubmitting={"در حال ارسال اطلاعات"}/>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}