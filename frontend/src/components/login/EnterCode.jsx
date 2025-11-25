import { useEffect, useState } from "react";
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

const schema = z.object({
    otp: z.string().nonempty('این فیلد الزامی است').length(6, 'کد وارد شده معتبر نیست'),
})
export default function EnterCode({phoneNumber}) {
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
            console.log(err.response.data.message)
            setError("otp", {type: "validate",message: err.response.data.message})
            setStatusCode(err.response.data.statusCode)

        });
    },[])
    const onSubmit = (data) => {
        console.log({phoneNumber, otp: +data.otp});
        otpAndEndLoginMutation.mutateAsync({phoneNumber, otp: +data.otp}).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err.response.data.message)
                setError("otp", {type: "validate",message: err.response.data.message})
            });
        console.log(otpAndEndLoginMutation.isSuccess)
        console.log('hi56')
    } 
    return (
        <div className="w-full h-max flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}  className="w-full h-max flex flex-col gap-1.5">
                <CompleteTitle title={'اطلاعات هویتی بیمار را وارد کنید'}/>
                <p className="text-sm text-898989 mt-5">کد تایید ارسال شده به شماره {phoneNumber} را وارد کنید.</p>
                <Input type={'text'} register={register('otp')} placeholder={'کد 6 رقمی'} mode={'numeric'} 
                isValid={watch('otp') ? getFieldStateValue('otp') : false || !errors.otp} readonly={watch('otp').length == 6 && !errors.otp}/>
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
                    <Button text={'ورود'} isSubmitting={transitionToGatewayMutation.isPending} textSubmitting={"درحال ارسال اطلاعات..."} disable={!isValid} />
            </form>
            {showAlert && <Alert show={showAlert} text={watch('phoneNumber')} change={changeShowAlert}/>}
        </div>
    )
}