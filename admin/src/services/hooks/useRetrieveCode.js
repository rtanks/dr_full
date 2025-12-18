import { useEffect, useState } from "react"

//the value if the time must be second 
export default function useRetrieveCode() {
    const [counter, setCounter] = useState((localStorage.getItem("counter") == null) ? 120 : localStorage.getItem("counter")) 
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
            return "ارسال مجدد کد"
        } else {
            return `${counter} تا ارسال مجدد کد`
        }
    }

    const resendCode = () => {
        setCounter(110);
        setTryAgain(false)
        console.log("hi")
    }
    return {showTime, resendCode}    
}