import { motion } from "framer-motion"

export function InputWithLabel({type, label, mode, placeholder, register, hasError, isValid}){
    return(
        <>
            <label className="w-full h-max font-bold text-[#000000] text-md pr-0.5">
                {label}
            </label>
            <motion.input inputMode={mode}
                type={type} placeholder={placeholder} 
                {...register}
                animate={{
                    borderColor: hasError ? "#F87171" : isValid ? "#34D399" : "#D1D5DB"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }} 
                className="w-full h-12 rounded-xl text-gray-500 px-5 mt-1.5 focus:outline-none border-2 text-right"
            />
        </>
    )
}
export function Input({type, placeholder, mode, register, hasError, isValid}){
    return(
        <>
            <motion.input inputMode={mode}
                type={type} placeholder={placeholder} 
                {...register}
                animate={{
                    borderColor: hasError ? "#F87171" : isValid ? "#34D399" : "#D1D5DB"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-12 rounded-xl text-gray-500 px-5 focus:outline-none border-2 text-right"
            />
        </>
    )
}