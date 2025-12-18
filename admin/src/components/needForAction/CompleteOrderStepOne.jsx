import { zodResolver } from '@hookform/resolvers/zod'
import SelectPartBody from './body/SelectPartBody'
import ChooseInsurance from './ChooseInsurance'
import RequestButton from './RequestButton'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import TextError from './TextError'
import Symptoms from './symptoms'
import { useEffect, useRef, useState } from 'react'
import z from 'zod'
import Notification from './Notification'
import { useNavigate } from 'react-router-dom'
import SelectService from './SelectService'
import { InputWithLabel } from './Inputs'
import { getCategory } from '../../services/func/getTypeRequst'
import registerRequestService from '../../services/api/registerRequestService'

const schema = z.object({
    fullName: z.string().nonempty('این فیلد الزامی است'),
    nationalCode: z.string().nonempty('این فیلد الزامی است').length(10, 'کد ملی وارد شده معتبر نیست'),
    phoneNumber: z.string().nonempty('این فیلد الزامی است').regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست").length(11, 'شماره تلفن وارد شده معتبر نیست'),
    service: z.string().optional(),
    area: z.string().array().optional(),
    insurance: z.string().optional(),
    explain: z.string().optional(),
}).refine(
    async (val) => val.fullName.split(' ').filter(n => n.length > 0).length >= 2, 
    {message: 'نام و نام خانوادگی وارد شده معتبر نیست', path: ['fullName']}
);
export default function CompleteOrderStepOne() {
    const navigate = useNavigate();
    const patient = useSelector(state => state.patientAction)
    const container = useRef();
    // const requestDefaultValue = useSelector(state => state.request);
    const {register, handleSubmit, setFocus, watch, setValue, getFieldState, control, formState: {errors, defaultValues,isValid, touchedFields, isSubmitting}} = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
            fullName: patient.fullName || '',
            nationalCode: patient.nationalCode || '',
            phoneNumber: patient.phoneNumber || '',
            service: 'ام ار آی',
            area: [],
            insurance: '',
            explain: '',
        }
    })
    const getAreas = (value) => { setValue('area', value); }
    const getInsurance = (value) => { setValue("insurance", value) }
    const getService = (value) => { setValue("service", value) }
    const getFieldStateValue = (fieldName) => {
        const {invalid} = getFieldState(fieldName, control);
        return !invalid;
    }
    const [showNotification, setShowNotification] = useState({key: '', text: ''});
    const changeShowNotification = (value) => {
        setShowNotification({key: value, text: ''});
    }
    useEffect(()=>{
        console.log(Object.keys(errors)[0])
        const firstError = Object.keys(errors)[0];
        if(firstError) {
            console.log(errors[firstError])
            setShowNotification({key: firstError, text: errors[firstError].message})
            setFocus(firstError)
        }
    },[errors, setFocus])
    const {registerRequestMutation} = registerRequestService();
    const onSubmit = (data) => {
        console.log(data)
        const {fullName, nationalCode, phoneNumber, ...requestData} = data;
        console.log({phoneNumber, category: getCategory(data.service), requestData})
        registerRequestMutation.mutate({phoneNumber, category: getCategory(data.service), requestData});
    }
    return (
        <div ref={container} className="w-full h-full flex flex-col gap-1 overflow-y-scroll">
            <form onSubmit={handleSubmit(onSubmit)} className='w-full h-[87%] flex flex-col gap-5'>
                <div className='bg-white w-full h-max rounded-2xl px-1.5 sm:px-4 pb-2'>
                    <div className='w-full h-max mb-5 flex flex-col gap-2'>
                    <div className='w-full mb-2'>اطلاعات بیمار را وارد کنید</div>
                        <div className='w-full'>
                            <InputWithLabel register={register('fullName')} label={'نام و نام خانوادگی'} placeholder={'علی بیرانوند'}/>  
                        </div>
                        <div className='w-full'>
                            <InputWithLabel register={register('nationalCode')} label={'کد ملی'} placeholder={'4061234567'}/>
                        </div>
                        <div className='w-full'>
                            <InputWithLabel register={register('phoneNumber')} label={'شماره همراه'} placeholder={'09109874567'}/>
                        </div>
                    </div>
                    <div className='w-full mb-5'>نوع خدمت را انتخاب کنید</div>
                    <SelectService getService={getService}/>
                    <SelectPartBody containerRef={container.current} getAreas={getAreas} register={register('area')}/>

                    <Symptoms register={register('explain')} isValid={watch('explain') ? getFieldStateValue('explain') : false} isError={errors?.explain} messageError={errors?.explain?.message}/>
                    
                    <ChooseInsurance  getInsurance={getInsurance}/>
                    {errors.insurance && <TextError message={errors.insurance.message}/>}

                    <RequestButton type={'submit'}  text="انتقال به درگاه برای پرداخت هزینه مشاوره پزشک متخصص با 10 % تخفیف 26.000 تومان " 
                     textSubmitting={'در حال ثبت اطلاعات...'} isSubmitting={registerRequestMutation.isPending} valid={isValid}/>
                </div>
            </form>
            {/* {showNotification == 'authError' && <Notification change={() => changeShowNotification('')} 
            text={'برای ادامه لطفاً وارد حساب کاربری‌ تان شوید'} show={showNotification} bg1={'bg-red-500'} bg2={'bg-red-300'} color={'text-red-800'}/>}
            {showNotification.key != '' && <Notification change={() => changeShowNotification('')} 
                text={showNotification.text} show={showNotification} bor={'border-red-500'} 
                bg={'bg-[#f3cece]'} color={'text-red-800'}/>} */}
        </div>
    )
}


