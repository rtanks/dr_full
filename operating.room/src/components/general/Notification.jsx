import { FaCircleInfo } from "react-icons/fa6";
import { useEffect } from 'react';
import { motion } from "framer-motion";

export default function Notification({text, show, change, bor, bg, color}) {
    useEffect(() => {
        const timeOut = setTimeout(()=> {
            change();
            console.log("hi");
        }, 3500)
        return () => clearTimeout(timeOut);
    }, [show])
    return (
        <motion.div animate={{translateY: [-20,1],transition:{duration: 0.5}}} 
        className={`w-10/12 z-50 sm:w-80 fixed left-[9%] sm:left-[40%] top-2 h-max border ${bor} ${bg} ${color} rounded-lg p-3 text-sm`}>
            <FaCircleInfo size={17} className={`inline-block ml-2 mb-1 ${color}`}/>
            {text}
        </motion.div>
    )
}
