import { motion} from "framer-motion";
export default function RadarCircle() {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="absolute top-0 right-5 w-[8px] h-[8px] rounded-full bg-green-400"
                    animate={{scale: [1, 5], opacity: [0.6, 0.15, 0],}}
                    transition={{duration: 2.4, ease: "easeOut", times: [0, 0.7, 1], repeat: Infinity, delay: i * 0.6}}
                />
            ))}
            <div className="w-[10px] h-[10px] rounded-full bg-green-600 right-5 absolute top-0"></div>
        </div>
    );
}
