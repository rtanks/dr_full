import { useState } from "react";
import useCounterTime from "../../services/hook/useCounterTime";
import Button from "../general/Button";
import { Input } from "./Inputs";

export default function EnterCode({isValid, register}) {
    const {showTime,resendCode, tryAgain} = useCounterTime()
    const [] = useState(false)
    return (
        <div className="w-full h-max flex flex-col">
            <div className="w-full h-max flex flex-row items-end gap-1.5">
                <Input type={'text'} register={register} placeholder={'کد 6 رقمی'} mode={'numeric'} isValid={isValid}/>
                
                {
                    isValid ? (
                        <Button text={'ارسال کد'}/>
                    ): (
                        <div onClick={() => resendCode()} 
                        className={`w-full border border-gray-400 ${tryAgain ?
                         "bg-blue-500 text-white" :"bg-zinc-200 text-676767"} 
                         text-sm  h-12 rounded-xl flex items-center justify-center`}>
                            {
                                showTime()
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}