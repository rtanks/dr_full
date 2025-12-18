import { useEffect, useRef, useState } from "react";
import useCounterTime from "../../services/hook/useCounterTime";
import Button from "../general/Button";
import { Input } from "../request/Inputs";
import CompleteTitle from "../CompleteTitle";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "../general/Alert";
import loginService from "../../services/api/loginService";
import registerRequestService from "../../services/api/registerRequestService";
import { getTypeRequest } from "../../services/func/getTypeRequest";
import TextError from "../request/TextError";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import LoadingGateway from "./LoadingGateway";
import ButtonCustom from "../general/ButtonCustom";
import Notification from "../general/Notification";

const schema = z.object({
    otp: z.string().nonempty('این فیلد الزامی است').length(4, 'کد وارد شده معتبر نیست'),
})
export default function EnterCode({phoneNumber,editPhoneNumber, showRegister}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {showTime,resendCode, counter, tryAgain} = useCounterTime();
    const [showAlert, setShowAlert] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
    const changeShowAlert = (value) => {
        setShowAlert(value);
    }
    const {register, watch, control, setError, handleSubmit, getFieldState, formState: {errors, isSubmitting, isValid}} = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            otp: '',
        }
    })
    const getFieldStateValue = (fieldName) => {
        const {invalid} = getFieldState(fieldName, control);
        return !invalid;
    }
    const {otpAndEndLoginMutation, retryOtpMutation} = loginService();
    const retryOtp = () => {
        retryOtpMutation.mutateAsync({phoneNumber}).then(res => {
            setShowAlert(true);
            console.log(res)
        }).catch(err => {
            console.log(err.response.data.message)
            setError("otp", {type: "validate",message: err.response.data.message})
            setStatusCode(err.response.data.statusCode)
        });
    }
    const {transitionToGatewayMutation} = registerRequestService();
    useEffect(()=>{
        retryOtpMutation.mutateAsync({phoneNumber}).then(res => {
            setShowAlert(true);
            console.log(res)
        }).catch(err => {
            setShowAlert(true);
            console.log(err.response.data.message)
            setError("otp", {type: "validate",message: err.response.data.message})
            setStatusCode(err.response.data.statusCode)

        });
    },[])
    useEffect(() => {
        if(watch('otp').length == 4) {
            (handleSubmit(onSubmit))()
        }
    }, [watch('otp')])
    const onSubmit = (data) => {
        console.log({phoneNumber, otp: +data.otp});
        otpAndEndLoginMutation.mutateAsync({phoneNumber, otp: data.otp}).then(res => {
                setLoading(true);
                console.log(res)
                transitionToGatewayMutation.mutateAsync({amount: 260000, description: getTypeRequest()}).then(res => {
                    setLoading(false);
                    localStorage.removeItem('timeStart')
                }).catch(err => err);
                // dispatch(closeModal())
            }).catch(err => {
                console.log(err.response.data.message)
                setError("otp", {type: "validate",message: err.response.data.message})
                if(err.response.data.message == 'کاربر مورد نظر یافت نشد!') {
                    console.log('register')
                    showRegister()
                }
            });
        console.log(otpAndEndLoginMutation.isSuccess)
        console.log('hi56')
    } 
    return (
        <div className="w-full h-max flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}  className="w-full h-max flex flex-col gap-1.5">
                <CompleteTitle title={'کد تایید را وارد کنید'}/>
                <p className="text-sm text-898989 mt-5">کد تایید ارسال شده به شماره {phoneNumber} را وارد کنید.</p>

                <Input type={'text'} autoFocus={true} register={register('otp')} placeholder={'کد 4 رقمی'} mode={'numeric'} 
                isValid={watch('otp') ? getFieldStateValue('otp') : false || !errors.otp} maxLength={4}/>
                {errors.otp && <TextError message={errors.otp.message}/>}

                <div onClick={() => resendCode()} 
                    className={`w-full text-898989 mb-5 
                     text-sm  h-12 rounded-xl flex flex-row items-center justify-between`}>
                    <span className="w-max flex flex-row items-center gap-2 text-676767 text-sm">
                        <span>{statusCode == 403 ? 0 :counter}</span>
                        <span>ثانیه تا ارسال مجدد</span>
                    </span>
                    <button onClick={retryOtp} className="w-max bg-transparent border-0">
                        {
                            showTime()
                        }
                    </button>
                </div>
                    <Button text={'تایید و  پرداخت'} isSubmitting={transitionToGatewayMutation.isPending} textSubmitting={"درحال انتقال به درگاه..."} disable={!isValid} />
                    <ButtonCustom text={`ویرایش شماره ${phoneNumber}`} onClick={() => {localStorage.setItem('timeStart', JSON.stringify(0)); editPhoneNumber();}} additionalStyle={"border-[#ffcc80] text-[#b95e3c] bg-[#fff3e0]"} type={'button'} />    
            </form>
            {showAlert && <Alert show={showAlert} text={watch('phoneNumber')} change={changeShowAlert}/>}
            {loading && <LoadingGateway amount={260000}/>}
            {showAlert && errors.otp && <Notification show={showAlert} text={errors.otp.message} change={changeShowAlert} 
                bor={'border-red-500'} bg={'bg-[#f3cece]'} color={'text-red-800'}/>}
        </div>
    )
}