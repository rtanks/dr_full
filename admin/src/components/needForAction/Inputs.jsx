import { motion } from "framer-motion"

export function InputWithLabel({type, label, mode, placeholder, register, hasError, isValid, maxLength}){
    return(
        <>
            <label className="w-full h-max text-unselect text-md pr-0.5">
                {label}
            </label>
            <motion.input inputMode={mode} maxLength={maxLength}
                type={type} placeholder={placeholder}
                {...register}
                animate={{
                    borderColor: hasError ? "#F87171" : isValid ? "#2e7d32" : "#DDD"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }} 
                className="w-full h-12 rounded-xl text-gray-700 px-5 mt-1.5 focus:outline-none border text-right"
            />
        </>
    )
}
export function Input({type, placeholder, mode, register, hasError, maxLength, autoFocus, isValid}){
    return(
        <>
            <motion.input inputMode={mode} maxLength={maxLength}
                type={type} placeholder={placeholder} autoFocus={autoFocus}
                {...register}
                animate={{
                    borderColor: hasError ? "#F87171" : isValid ? "#2e7d32" : "#D1D5DB"
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-12 rounded-xl text-gray-700 px-5 focus:outline-none border-2 text-right"
            />
        </>
    )
}