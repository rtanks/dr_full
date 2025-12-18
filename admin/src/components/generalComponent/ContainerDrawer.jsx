import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';
import TestHeader from './HeaderTest';

export default function ContainerDrawer({onClick, header, children}) {
    const controllers = useAnimationControls();
    const container = useRef();
    const closeDrawerAnimate = async () => {
        await controllers.start('true')
        // await for create delay for done animation complete and execute next command
        onClick()
    }
    useEffect(() => {
        controllers.start('false');
    }, [])
    return (
         <div onClick={closeDrawerAnimate} className="w-full h-full bg-[#0004] vazir-medium fixed left-0 top-0 z-50 overflow-y-scroll">
            <motion.div ref={container} onClick={(e) => e.stopPropagation()} animate={controllers} variants={{
                false: {translateX: [-400,0], transition: {duration: 0.5}},
                true: {translateX: [0,-400], transition: {duration: 0.5}}}}
                className="w-full sm:w-[402px] origin-left bg-white mr-auto h-full relative overflow-y-scroll">
                <TestHeader title={header} onClick={closeDrawerAnimate}/>
                {children}
            </motion.div>
        </div>
    )
}