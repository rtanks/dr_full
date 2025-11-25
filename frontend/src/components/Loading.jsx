import { motion } from "framer-motion"

export default function Loading() {
    return (
        <div className="w-full h-full fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="flex space-x-3">
                <motion.span
                    className="w-6 h-6 bg-main rounded-full"
                    animate={{scale: [0.5, 1, 0.5], transition: { duration: 1, repeat: Infinity, ease: "easeInOut",delay: 0}}}
                />
                <motion.span
                    className="w-6 h-6 bg-main rounded-full"
                    animate={{scale: [0.5, 1, 0.5], transition: { duration: 1, repeat: Infinity, ease: "easeInOut",delay: 0.2}}}
                />
                <motion.span
                    className="w-6 h-6 bg-main rounded-full"
                    animate={{scale: [0.5, 1, 0.5], transition: { duration: 1, repeat: Infinity, ease: "easeInOut",delay: 0.4}}}
                />
            </div>

        </div>
    )
}