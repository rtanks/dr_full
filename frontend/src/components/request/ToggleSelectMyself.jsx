import React from "react";

const ToggleSelectMyself = ({ items, active, onChange, getForMyself }) => {
    
    return (
        <div className="grid grid-cols-12 gap-2 text-center w-full mx-auto">
            {items.map((item) => (
                <div
                    key={item.id}
                    onClick={() => {onChange(item.id); getForMyself(item.id)}}
                    className={`col-span-5 sm:col-span-2 text-md cursor-pointer text-[#898989] py-2 rounded-xl 
                    ${active === item.id ? "bg-blue-200 text-blue-700" : "bg-gray-200"}`}>
                    {item.text}
                </div>
            ))}
        </div>
    );
};

export default ToggleSelectMyself;
