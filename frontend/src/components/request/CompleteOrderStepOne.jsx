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
import Notification from '../general/Notification'
import CheckAuth from '../../services/hook/CheckAuth'
import { getShowModal } from '../../slices/modalSlice'
import {getCategory, getKeyRequest, getTypeRequest, getTypeRequestService} from '../../services/func/getTypeRequest'
import registerRequestService from '../../services/api/registerRequestService'
import HeaderRequestStatus from './HeaderRequestStatus'
import LoadingGateway from '../payment/LoadingGateway'
import HeaderAuth from '../../services/api/headerAndUrlService'
import { transformFormatWithSpread } from '../../services/func/transformFunc'

const schema = z.object({
    service: z.string(),
    area: z.string().array().nonempty('لطفا ناحیه یا نواحی مورد نظر را انتخاب کنید!'),
    insurance: z.string().nonempty('این فیلد الزامی است'),
    explain: z.string().nonempty('این فیلد الزامی است'),
})
export default function CompleteOrderStepOne({price, text}) {
    const container = useRef();
    const {id} = HeaderAuth();
    // const requestDefaultValue = useSelector(state => state.request);
    const {register, handleSubmit, setFocus, watch, setValue, getFieldState, control, formState: {errors, defaultValues,isValid, touchedFields, isSubmitting}} = useForm({
        resolver: zodResolver(schema),
        mode: "all",
        defaultValues: {
            service: '',
            area: [],
            insurance: '',
            explain: '',
        }
    })
    const getAreas = (value) => { setValue('area', value); }
    const getInsurance = (value) => { setValue("insurance", value) }
    const getFieldStateValue = (fieldName) => {
        const {invalid} = getFieldState(fieldName, control);
        return !invalid;
    }
    const [showNotification, setShowNotification] = useState({key: '', text: ''});
    // authError, send, ''
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { checkAuthUser } = CheckAuth();
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
    const {initialRegisterRequestMutation, transitionToGatewayMutation} = registerRequestService()
    const onSubmit = (data) => {
        console.log(data)
        console.log({userId: id, statusPay: 'pending',category: getCategory(getTypeRequestService()), request:{...data, price: 263000, service: getTypeRequestService()}})
        initialRegisterRequestMutation.mutate({userId: id, statusPay: 'pending', category: getCategory(getTypeRequestService()), request:{...data, price: 263000, service: getTypeRequestService()}})
        if(checkAuthUser()) {
            setLoading(true);
            transitionToGatewayMutation.mutateAsync({amount: price, description: getTypeRequest()}).then(res => {
                setLoading(false);
                localStorage.removeItem('timeStart')
            }).catch(err => err);
        } else {
            dispatch(getShowModal({item: 'payment'}));
        }
    }
    return (
        <div ref={container} className="w-full h-full flex flex-col gap-1 overflow-y-scroll">
            <HeaderRequestStatus typeRequest={'مشاوره جدید'} titleRequest={getTypeRequest()} 
            statusRequest={'درحال انجام'} keyRequest={getKeyRequest()} date={'1404/12/22'} time={'14:45'}/>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full h-[87%] flex flex-col gap-5'>
                <div className='bg-white w-full h-max rounded-2xl px-1.5 sm:px-4 pb-2'>
                    <SelectPartBody containerRef={container.current} getAreas={getAreas} register={register('area')}/>
                    
                    <Symptoms register={register('explain')} isValid={watch('explain') ? getFieldStateValue('explain') : false} 
                        isError={errors?.explain} messageError={errors?.explain?.message}/>
                    
                    <ChooseInsurance  getInsurance={getInsurance}/>
                    {errors.insurance && <TextError message={errors.insurance.message}/>}

                    <RequestButton type={'submit'}  text={`انتقال به درگاه برای پرداخت هزینه ${text} با 10 % تخفیف ${transformFormatWithSpread(String(price).slice(0,-1))} تومان ` }
                     textSubmitting={'در حال ثبت اطلاعات...'} valid={isValid}/>
                </div>
            </form>
            {showNotification == 'authError' && <Notification change={() => changeShowNotification('')} 
            text={'برای ادامه لطفاً وارد حساب کاربری‌ تان شوید'} show={showNotification} bg1={'bg-red-500'} bg2={'bg-red-300'} color={'text-red-800'}/>}
            {showNotification.key != '' && <Notification change={() => changeShowNotification('')} 
                text={showNotification.text} show={showNotification} bor={'border-red-500'} 
                bg={'bg-[#f3cece]'} color={'text-red-800'}/>}
            {loading && <LoadingGateway amount={260000}/>}
        </div>
    )
}


