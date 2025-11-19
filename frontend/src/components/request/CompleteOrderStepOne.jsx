import useRequestTools from '../../services/hook/useRequestTools'
import { zodResolver } from '@hookform/resolvers/zod'
import SelectPartBody from './body/SelectPartBody'
import ChooseInsurance from './ChooseInsurance'
import CompleteTitle from '../CompleteTitle'
import RequestButton from './RequestButton'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { InputWithLabel } from './Inputs'
import Button from '../general/Button'
import TextError from './TextError'
import Symptoms from './symptoms'
import { useState } from 'react'
import z from 'zod'
import Notification from '../general/Notification'
import CheckAuth from '../../services/hook/CheckAuth'
import EnterCode from './EnterCode'

const schema = z.object({
    fullName: z.string().nonempty('این فیلد الزامی است').min(5, 'نام و نام خانوادگی باید حداقل ۵ کاراکتر باشد'),
    nationalCode: z.string().nonempty('این فیلد الزامی است').length(10, 'کد ملی وارد شده معتبر نیست'),
    insurance: z.string().nonempty('این فیلد الزامی است'),
    phoneNumber: z.string().nonempty('این فیلد الزامی است').regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست").length(11, 'شماره تلفن وارد شده معتبر نیست'),
    // city: z.string().nonempty('این فیلد الزامی است'),
    explain: z.string().nonempty('این فیلد الزامی است').min(5, 'شرح حال باید حداقل ۵ کاراکتر باشد'),
    otp: z.string().nonempty('این فیلد الزامی است').length(6, 'کد وارد شده معتبر نیست')
});

export default function CompleteOrderStepOne({selectStep}) {
    const requestDefaultValue = useSelector(state => state.request);
    const {register, handleSubmit, watch, setValue, getFieldState, control, formState: {errors, defaultValues,isValid, touchedFields, isSubmitting}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            fullName: requestDefaultValue.fullName,
            nationalCode: requestDefaultValue.nationalCode,
            insurance: requestDefaultValue.insurance,
            phoneNumber: requestDefaultValue.phoneNumber,
            explain: requestDefaultValue.explain,
            otp: ''
        }
    })
    const getForMyself = (value) => {
        setValue('myself', (value === 'formyself'))
    }
    const getInsurance = (value) => {
        setValue("insurance", value)
    }
    const getFieldStateValue = (fieldName) => {
        const {invalid} = getFieldState(fieldName, control);
        return !invalid;
    }
    const { getDataFromStepOne } = useRequestTools();
    const [showNotification, setShowNotification] = useState('');
    // authError, send, ''

    const { checkAuthUser } = CheckAuth();
    const changeShowNotification = (value) => {
        setShowNotification(value)
    }
    const [enterCode, setEnterCode] = useState(false);
    const handlerClick = () => {
        if(!checkAuthUser()) {
            setShowNotification('authError');
        } else {
            setShowNotification('send');
        }
    }
    const onSubmit = (data) => {
        getDataFromStepOne(data);
        // selectStep('step2');
        console.log(data)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
                <div className='w-full h-max p-1.5 sm:px-4 flex flex-col gap-3 rounded-2xl py-2 bg-white'>
                    <CompleteTitle title={'اطلاعات هویتی بیمار را وارد کنید'} />
                    <div className='w-full h-max flex flex-col sm:flex-row gap-3 sm:gap-2'>
                        <div className='w-full sm:w-1/2'>
                            <InputWithLabel  type={'text'} label={'نام و نام خانوادگی بیمار'} 
                                placeholder={"مثال : اشکان حسنوندی"} register={register('fullName')} 
                                hasError={errors.fullName} isValid={watch('fullName') ? getFieldStateValue('fullName'): false}/>
                            {errors.fullName && <TextError message={errors.fullName.message}/>}
                        </div>
                        <div className='w-full sm:w-1/2'>
                            <InputWithLabel label={'کد ملی '} placeholder={"مثال : 1234567890"}
                                register={register('nationalCode')} isValid={watch('nationalCode') ? getFieldStateValue('nationalCode') : false} 
                                hasError={errors.nationalCode}/>
                            {errors.nationalCode && <TextError message={errors.nationalCode.message}/>}
                        </div>
                    </div>

                    <div className='w-full h-max flex flex-row gap-2 sm:gap-2 items-start'>
                        <div className='w-1/2 h-max'>
                            <InputWithLabel type={'text'} label={'شماره تلفن'} 
                                placeholder={"مثال : 1234567890"} register={register('phoneNumber')} 
                                hasError={errors.phoneNumber} isValid={watch('phoneNumber') ? getFieldStateValue('phoneNumber') : false}/>
                            {errors.phoneNumber && <TextError message={errors.phoneNumber.message}/>}
                        </div>
                        <div className='w-1/2 h-max flex flex-col items-start justify-end gap-0'>
                            {
                                enterCode ? (
                                    <div className={`w-full h-max flex flex-col gap-1 pt-[9%]`}>
                                        <EnterCode register={register('otp')} isValid={watch('otp') ? getFieldStateValue('otp') : false}/>
                                        {errors.otp  && <TextError message={errors.otp.message}/>}
                                    </div>
                                ) : (
                                    <div className='w-full h-max flex flex-row gap-2 pt-[9%]'>
                                        <Button type={'button'}  onClick={() => handlerClick()} text={'دریافت پیامک'} 
                                        disable={errors.phoneNumber? true : (watch('phoneNumber')? false : true)}/>
                                        <Button onClick={() => setEnterCode(true)} type={'button'} text={'ورود کد'} disable={false}/>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>

                <div className='bg-white w-full h-max rounded-2xl px-1.5 sm:px-4 pb-2'>
                    <SelectPartBody/>
                    <Symptoms register={register('explain')} isValid={watch('explain') ? getFieldStateValue('explain') : false} isError={errors?.explain} messageError={errors?.explain?.message}/>
                    <ChooseInsurance getInsurance={getInsurance}/>
                    {errors.insurance && <TextError message={errors.insurance.message}/>}

                    <RequestButton type={'submit'} text="انتقال به درگاه برای پرداخت هزینه مشاوره پزشک متخصص با 10 % تخفیف 263.000 تومان " 
                    isSubmitting={isSubmitting} textSubmitting={'در حال ثبت اطلاعات...'} disable={false}/>
                </div>
            </form>
            {showNotification == 'authError' && <Notification change={() => changeShowNotification('')} 
            text={'برای ادامه لطفاً وارد حساب کاربری‌ تان شوید'} show={showNotification} bg1={'bg-red-500'} bg2={'bg-red-300'}/>}
            {showNotification == 'send' && <Notification change={() => changeShowNotification('')} 
            text={'کد با موفقیت ارسال شد'} show={showNotification} bg1={'bg-green-500'} bg2={'bg-green-300'}/>}
        </>
    )
}


