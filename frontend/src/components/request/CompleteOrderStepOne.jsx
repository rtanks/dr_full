import useRequestTools from '../../services/hook/useRequestTools'
import { zodResolver } from '@hookform/resolvers/zod'
import SelectPartBody from './body/SelectPartBody'
import ChooseInsurance from './ChooseInsurance'
import CompleteTitle from '../CompleteTitle'
import RequestButton from './RequestButton'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import TextError from './TextError'
import Symptoms from './symptoms'
import { useState } from 'react'
import z from 'zod'
import Notification from '../general/Notification'
import CheckAuth from '../../services/hook/CheckAuth'
import { getShowModal } from '../../slices/modalSlice'
import {getTypeRequest, getTypeRequestService} from '../../services/func/getTypeRequest'
import registerRequestService from '../../services/api/registerRequestService'

const schema = z.object({
    service: z.string(),
    area: z.string().array().nonempty('این فیلد الزامی است'),
    insurance: z.string().nonempty('این فیلد الزامی است'),
    explain: z.string().nonempty('این فیلد الزامی است'),
})
export default function CompleteOrderStepOne({selectStep}) {
    // const requestDefaultValue = useSelector(state => state.request);
    const {register, handleSubmit, watch, setValue, getFieldState, control, formState: {errors, defaultValues,isValid, touchedFields, isSubmitting}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            service: '',
            area: [],
            insurance: '',
            explain: '',
        }
    })
    const getAreas = (value) => {
        setValue('area', value);
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
    const dispatch = useDispatch();
    const { checkAuthUser } = CheckAuth();
    const changeShowNotification = (value) => {
        setShowNotification(value)
    }
    const [enterCode, setEnterCode] = useState(false);
    // const handlerClick = () => {
    //     if(!checkAuthUser()) {
    //         setShowNotification('authError');
    //     } else {
    //         setShowNotification('send');
    //     }
    // }
    const {initialRegisterRequestMutation} = registerRequestService()
    const onSubmit = (data) => {
        console.log(data)
        initialRegisterRequestMutation.mutate({...data, price: 263000, service: getTypeRequestService()})
        dispatch(getShowModal({item: 'payment'}));
        console.log({...data, service: getTypeRequestService()})
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-5'>
                <div className='bg-white w-full h-max rounded-2xl px-1.5 sm:px-4 pb-2'>
                    <SelectPartBody getAreas={getAreas}/>
                    <Symptoms register={register('explain')} isValid={watch('explain') ? getFieldStateValue('explain') : false} isError={errors?.explain} messageError={errors?.explain?.message}/>
                    <ChooseInsurance getInsurance={getInsurance}/>
                    {errors.insurance && <TextError message={errors.insurance.message}/>}

                    <RequestButton type={'submit'}  text="انتقال به درگاه برای پرداخت هزینه مشاوره پزشک متخصص با 10 % تخفیف 263.000 تومان " 
                     textSubmitting={'در حال ثبت اطلاعات...'} disable={false}/>
                </div>
            </form>
            {showNotification == 'authError' && <Notification change={() => changeShowNotification('')} 
            text={'برای ادامه لطفاً وارد حساب کاربری‌ تان شوید'} show={showNotification} bg1={'bg-red-500'} bg2={'bg-red-300'}/>}
            {showNotification == 'send' && <Notification change={() => changeShowNotification('')} 
            text={'کد با موفقیت ارسال شد'} show={showNotification} bg1={'bg-green-500'} bg2={'bg-green-300'}/>}
        </>
    )
}


