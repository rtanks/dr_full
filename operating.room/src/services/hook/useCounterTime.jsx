import { useEffect, useState } from "react";

//the value if the time must be second 
export default function useCounterTime() {
    const [counter, setCounter] = useState(() => {
        const diff = Math.floor(((JSON.parse(localStorage.getItem('timeStart')) + 120000) - Date.now()) / 1000);
        if(diff <= 0) {
            localStorage.setItem('setItem', JSON.stringify(Date.now()));
            return 120
        }
        console.log(diff)
        return diff;
    }) 
    const [tryAgain, setTryAgain] = useState(false);

    useEffect(() => {
        let counterInter = setInterval(() => {
            if(counter > 0) {
                setCounter(prev => prev - 1);
                localStorage.setItem("counter", counter - 1)
            }
            if(counter <= 0) {
                setTryAgain(true);
                clearInterval(counterInter);
                return 120;
            }
        }, 1000)
        return () => clearInterval(counterInter);
    }, [counter]); 

    const showTime = () => {
        if(tryAgain) {
            return (
                <div onClick={() => localStorage.setItem('timeStart', Date.now())} className="w-max h-max flex flex-row text-main font-bold items-center gap-1">
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