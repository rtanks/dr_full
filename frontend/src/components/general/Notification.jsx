import {motion} from 'framer-motion';
import { useEffect } from 'react';

export default function Notification({text, show='', change, bg1, bg2}) {
    useEffect(() => {
        const timeOut = setTimeout(()=> {
            change();
            console.log("hi");
        }, 3500)
        return () => clearTimeout(timeOut);
    }, [show])
    return (
        <motion.div animate={{translateX: [0,1],transition:{duration: 0.5}}} className={`w-[90%] sm:w-80 text-white text-sm flex flex-col gap-1 fixed left-5 top-5 ${bg1} overflow-hidden rounded-lg z-50`}>
            <span className='py-5 w-full text-center'>{text}</span>
            <motion.div animate={{scaleX: [0,1],transition: {duration: 3}}} className={`w-full h-1 ${bg2} origin-left`}></motion.div>
        </motion.div>
    )
}