import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useSelector } from 'react-redux'
import { InputWithLabel } from '../request/Inputs'
import { useState } from 'react'
import Alert from '../general/Alert'
import Button from '../general/Button'
import TextError from '../request/TextError'
import EnterCode from './EnterCode'
import CompleteTitle from '../CompleteTitle'
import loginService from '../../services/api/loginService'
import CheckAuth from '../../services/hook/CheckAuth'
import Register from './Register'

const schema = z.object({
    phoneNumber: z.string().nonempty('این فیلد الزامی است').regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست").length(11, 'شماره تلفن وارد شده معتبر نیست'),
})

export default function Login() {
    const requestDefaultValue = useSelector(state => state.request);
    const [showAlert, setShowAlert] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const {checkAuthUser} = CheckAuth();
    const changeShowAlert = (value) => {
        setShowAlert(value);
    }
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
        // setShowAlert(true)
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
                    enterCode ? (
                        <div className={`w-full h-max flex flex-col gap-1 sm:pt-[9%]`}>
                            <EnterCode phoneNumber={watch('phoneNumber')} showRegister={() => {setShowRegister(true);setEnterCode(false)}} editPhoneNumber={() => setEnterCode(false)}/>
                        </div>
                    ) : (
                        <>
                            {
                                showRegister ? (
                                    <Register phoneNumber={watch('phoneNumber')}/>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className='w-full h-max flex flex-col gap-3 sm:gap-2 mt-2'>
                                        <CompleteTitle title={' برای ورود / ثبت نام شماره همراه خود را وارد کنید'} />
                                        <div className='w-full h-max'>
                                            <InputWithLabel type={'text'} label={'شماره همراه'} mode={'numeric'} 
                                                placeholder={"مثال : 1234567890"} register={register('phoneNumber')} maxLength={11}
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
            {/* {showAlert && <Alert show={showAlert} text={watch('phoneNumber')} change={changeShowAlert}/>} */}
        </>
    )
}




