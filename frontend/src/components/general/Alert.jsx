import {motion} from 'framer-motion';
import { useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";

export default function Alert({text, show='', change}) {
    useEffect(() => {
        const timeOut = setTimeout(()=> {
            change(false);
            console.log("hi");
        }, 3500)
        return () => clearTimeout(timeOut);
    }, [show])
    return (
        <motion.div animate={{translateY: [-20,1],transition:{duration: 0.5}}} className={`w-[90%] sm:w-80
         text-select text-sm h-max flex flex-col gap-1 fixed left-[5%] sm:left-[40%] top-4 border border-select py-3 px-4
         overflow-hidden rounded-lg z-50 bg-select-container`}>
            <div className='w-full font-bold flex flex-row items-center gap-2'>
                <FaCircleCheck size={20}/>
                ارسال موفق کد
            </div>
            <div className='w-full text-sm text-center'> کد تایید برای شماره {text} ارسال شد </div>
        </motion.div>
    )
}