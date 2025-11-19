import React from 'react'
import { motion } from 'framer-motion'

const InputNumberPhone = ({ value, onChange, placeholder, isValid, hasError, maxLength = 4, disabled,Type="number" }) => {
    const handleChange = (e) => {
        let val = e.target.value.replace(/[^0-9]/g, '');
        if (val.length > maxLength) val = val.slice(0, maxLength);
        onChange(val);
    };

    return (
        <motion.input
            value={value}
            onChange={handleChange}
            type={Type}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full h-14 rounded-2xl vazir-medium text-gray-500 px-5 focus:outline-none border-2 text-right"
            animate={{
                borderColor: hasError ? "#F87171" : isValid ? "#34D399" : "#D1D5DB"
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        />
    );
};

export default InputNumberPhone;
