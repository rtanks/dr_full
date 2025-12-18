import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { InputWithLabel } from '../request/Inputs'
import { useState } from 'react'
import Alert from '../general/Alert'
import Button from '../general/Button'
import TextError from '../request/TextError'
import EnterCode from './EnterCode'
import CompleteTitle from '../CompleteTitle'
import loginService from '../../services/api/loginService'
import CheckAuth from '../../services/hook/CheckAuth'
import registerRequestService from '../../services/api/registerRequestService'
import { getTypeRequest } from "../../services/func/getTypeRequest";
import { closeModal } from '../../slices/modalSlice'
import LoadingGateway from './LoadingGateway'
import RegisterPay from './RegisterPay'

const schema = z.object({
    phoneNumber: z.string().nonempty('این فیلد الزامی است').regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست").length(11, 'شماره تلفن وارد شده معتبر نیست'),
})

export default function Info() {
    const [loading, setLoading] = useState(false);
    const requestDefaultValue = useSelector(state => state.request);
    const {checkAuthUser} = CheckAuth();
    const [showRegister, setShowRegister] = useState(false);
    const {initialLoginMutation} = loginService();
    const {transitionToGatewayMutation} = registerRequestService();
    const {register, handleSubmit, watch, setValue, getFieldState, control, formState: {errors, defaultValues,isValid, touchedFields, isSubmitting}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            phoneNumber: checkAuthUser() ? requestDefaultValue.phoneNumber :'',
        }
    })
    const getFieldStateValue = (fieldName) => {
        const {invalid} = getFieldState(fieldName, control);
        return !invalid;
    }
    const [enterCode, setEnterCode] = useState(false);
    const onSubmit = (data) => {
        console.log(data);
         if(localStorage.getItem('timeStart')) {
            if(JSON.parse(localStorage.getItem('counter')) <= 0) {
                localStorage.setItem('timeStart', JSON.stringify(Date.now()))
            }
        } else {
            localStorage.setItem('timeStart', JSON.stringify(Date.now()))
        }
        setEnterCode(true)
    }
    return (
        <>
            <div className='w-full h-max p-1.5 sm:px-4 flex flex-col gap-3 rounded-2xl bg-white'>
                {
                    enterCode && !checkAuthUser() ? (
                        <div className={`w-full h-max flex flex-col gap-1 sm:pt-[9%]`}>
                            <EnterCode phoneNumber={watch('phoneNumber')} showRegister={() => {setShowRegister(true);setEnterCode(false)}} editPhoneNumber={() => setEnterCode(false)}/>
                        </div>
                    ) : (
                        <>
                            <CompleteTitle title={'اطلاعات بیمار را وارد کنید'} />
                            {
                                showRegister ? (
                                    <RegisterPay phoneNumber={watch("phoneNumber")}/>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-max flex flex-col gap-3 sm:gap-2 mt-2'>
                                        <div className='w-full h-max'>
                                            <InputWithLabel type={'text'} label={'شماره همراه'} 
                                                placeholder={"مثال : 1234567890"} register={register('phoneNumber')} maxLength={11} mode={'numeric'}
                                                hasError={errors.phoneNumber} isValid={watch('phoneNumber') ? getFieldStateValue('phoneNumber') : false}/>
                                            {errors.phoneNumber && <TextError message={errors.phoneNumber.message}/>}
                                        </div>
                                        <div className='w-full h-max flex flex-col items-start justify-end gap-0'>
                                            <div className='w-full h-max flex flex-col gap-2 pt-2 sm:pt-[9%]'>
                                                <Button type={'submit'} text={'دریافت پیامکی'} 
                                                disable={errors.phoneNumber? true : (watch('phoneNumber')? false : true)}/>
                                            </div>
                                        </div>
                                    </form>
                                )
                            }
                        </>
                    )
                }
            </div>
            {loading && <LoadingGateway amount={260000}/>} 
        </>
    )
}


