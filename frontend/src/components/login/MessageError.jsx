import {motion} from 'framer-motion'


export default function MessageError({message}) {
    return(
        <motion.p animate={{translateX: [1,2,1], transition:{duration: 0.5}}} 
            className='w-full h-max py-2 text-red-600 text-sm'
        >
            {message}
        </motion.p>
    )
}