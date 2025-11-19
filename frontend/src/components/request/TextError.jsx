import { motion } from "framer-motion"

export default function TextError({message}) {
    return (
        <motion.label
                className='block text-xs text-red-500 my-2'
                initial={{ opacity: 0.3, x: 20 }}
                animate={{ opacity: 1, x: 0, color: "#EF4444" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}>
               {message}
        </motion.label>
    )
}