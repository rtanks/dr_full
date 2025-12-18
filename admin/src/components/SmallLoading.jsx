import { motion } from "framer-motion"

export default function SmallLoading() {
    return (
        <div className="w-full h-48 inset-0 bg-white flex items-center justify-center z-50">
            <div className="flex space-x-3">
                <motion.span
                    className="w-4 h-4 bg-blue-500 rounded-full"
                    animate={{scale: [0.5, 1, 0.5], transition: { duration: 1, repeat: Infinity, ease: "easeInOut",delay: 0}}}
                />
                <motion.span
                    className="w-4 h-4 bg-blue-500 rounded-full"
                    animate={{scale: [0.5, 1, 0.5], transition: { duration: 1, repeat: Infinity, ease: "easeInOut",delay: 0.2}}}
                />
                <motion.span
                    className="w-4 h-4 bg-blue-500 rounded-full"
                    animate={{scale: [0.5, 1, 0.5], transition: { duration: 1, repeat: Infinity, ease: "easeInOut",delay: 0.4}}}
                />
            </div>

        </div>
    )
}