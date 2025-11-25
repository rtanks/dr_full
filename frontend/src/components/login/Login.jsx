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

const schema = z.object({
    fullName: z.string().nonempty('این فیلد الزامی است'),
    nationalCode: z.string().nonempty('این فیلد الزامی است').length(10, 'کد ملی وارد شده معتبر نیست'),
    phoneNumber: z.string().nonempty('این فیلد الزامی است').regex(/^09\d{9}$/, "شماره تلفن وارد شده معتبر نیست").length(11, 'شماره تلفن وارد شده معتبر نیست'),
}).refine(
    async (val) => val.fullName.split(' ').filter(n => n.length > 0).length >= 2, 
    {message: 'نام و نام خانوادگی وارد شده معتبر نیست', path: ['fullName']}
);

export default function Login() {
    const requestDefaultValue = useSelector(state => state.request);
    const [showAlert, setShowAlert] = useState(false);
    const {checkAuthUser} = CheckAuth();
    const {initialLoginMutation} = loginService()
    const changeShowAlert = (value) => {
        setShowAlert(value);
    }
    console.log(requestDefaultValue)
    const {register, handleSubmit, watch, setValue, getFieldState, control, formState: {errors, defaultValues,isValid, touchedFields, isSubmitting}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            fullName: checkAuthUser() ? requestDefaultValue.fullName :'',
            nationalCode: checkAuthUser() ? requestDefaultValue.nationalCode :'',
            phoneNumber: checkAuthUser() ? requestDefaultValue.phoneNumber :'',
        }
    })
    const getFieldStateValue = (fieldName) => {
        const {invalid} = getFieldState(fieldName, control);
        return !invalid;
    }
    const [enterCode, setEnterCode] = useState(false);
    const {} = loginService();
    const onSubmit = (data) => {
        console.log(data);
        initialLoginMutation.mutate(data);
        setShowAlert(true)
        setEnterCode(true)
    }
    return (
        <>
            <div className='w-full h-max p-1.5 sm:px-4 flex flex-col gap-3 rounded-2xl bg-white'>
                {
                    enterCode ? (
                        <div className={`w-full h-max flex flex-col gap-1 sm:pt-[9%]`}>
                            <EnterCode phoneNumber={watch('phoneNumber')}/>
                        </div>
                    ) : (
                        <>
                            <CompleteTitle title={'اطلاعات بیمار را وارد کنید'} />
                            <form onSubmit={handleSubmit(onSubmit)} className='w-full h-max flex flex-col gap-3 sm:gap-2 mt-2'>
                                <div className='w-full'>
                                    <InputWithLabel  type={'text'} label={'نام و نام خانوادگی'} readonly={false}
                                        placeholder={"مثال : اشکان حسنوندی"} register={register('fullName')} 
                                        hasError={errors.fullName} isValid={watch('fullName') ? getFieldStateValue('fullName'): false}/>
                                    {errors.fullName && <TextError message={errors.fullName.message}/>}
                                </div>
                                <div className='w-full'>
                                    <InputWithLabel label={'کد ملی '} placeholder={"مثال : 1234567890"} readonly={watch('nationalCode')?.length == 10}
                                        register={register('nationalCode')} isValid={watch('nationalCode') ? getFieldStateValue('nationalCode') : false} 
                                        hasError={errors.nationalCode}/>
                                    {errors.nationalCode && <TextError message={errors.nationalCode.message}/>}
                                </div>
                                <div className='w-full h-max'>
                                    <InputWithLabel type={'text'} label={'شماره همراه'} 
                                        placeholder={"مثال : 1234567890"} register={register('phoneNumber')} readonly={watch("phoneNumber")?.length == 11}
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
                        </>
                    )
                }
            </div>      
            {showAlert && <Alert show={showAlert} text={watch('phoneNumber')} change={changeShowAlert}/>}
        </>
    )
}


