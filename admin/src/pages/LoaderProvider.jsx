// LoaderProviderMotion.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        setLoading(true);

        if (!containerRef.current) return;

        const imgs = Array.from(containerRef.current.querySelectorAll("img"));
        let loadedCount = 0;

        if (imgs.length === 0) {
            setLoading(false);
            return;
        }

        const onLoad = () => {
            loadedCount++;
            if (loadedCount === imgs.length) setLoading(false);
        };

        imgs.forEach((img) => {
            if (img.complete) {
                onLoad();
            } else {
                img.addEventListener("load", onLoad);
                img.addEventListener("error", onLoad);
            }
        });

        return () => {
            imgs.forEach((img) => {
                img.removeEventListener("load", onLoad);
                img.removeEventListener("error", onLoad);
            });
        };
    }, [children]);

    const dotVariants = {
        animate: {
            scale: [0.5, 1, 0.5],
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                    <div className="flex space-x-3">
                        <motion.span
                            className="w-6 h-6 bg-blue-500 rounded-full"
                            variants={dotVariants}
                            animate="animate"
                            transition={{ delay: 0 }}
                        />
                        <motion.span
                            className="w-6 h-6 bg-blue-500 rounded-full"
                            variants={dotVariants}
                            animate="animate"
                            transition={{ delay: 0.2 }}
                        />
                        <motion.span
                            className="w-6 h-6 bg-blue-500 rounded-full"
                            variants={dotVariants}
                            animate="animate"
                            transition={{ delay: 0.4 }}
                        />
                    </div>
                </div>
            )}
            <div ref={containerRef} style={{ display: loading ? "none" : "block" }}>
                {children}
            </div>
        </>
    );
};

export default LoaderProvider;
