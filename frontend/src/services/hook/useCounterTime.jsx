import { useEffect, useState } from "react"
import { SlRefresh } from "react-icons/sl";

//the value if the time must be second 
export default function useCounterTime() {
    const [counter, setCounter] = useState(120) 
    const [tryAgain, setTryAgain] = useState(false);

    useEffect(() => {
        let counterInter = setInterval(() => {
            if(counter > 0) {
                setCounter(prev => prev - 1);
            }
            if(counter <= 0) {
                setTryAgain(true);
                clearInterval(counterInter);
                return 120;
            }
            localStorage.setItem("counter", counter - 1)
        }, 1000)
        return () => clearInterval(counterInter);
    }, [counter]);

    const showTime = () => {
        if(tryAgain) {
            return (
                <div className="w-max h-max flex flex-row text-main font-bold items-center gap-1">
                    {/* <SlRefresh size={18}/> */}
                    <span>ارسال مجدد کد</span>
                </div>
            )
        } else {
            return (
                <div className="w-max h-max flex flex-row items-center gap-1">
                    {/* <SlRefresh size={18}/> */}
                    <span>ارسال مجدد کد</span>
                </div>
            )
        }
    }

    const resendCode = () => {
        setCounter(120);
        setTryAgain(false)
        console.log("hi")
    }
    return {showTime, tryAgain,counter, resendCode}    
}