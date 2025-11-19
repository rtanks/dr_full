import React, { useState } from "react";
export default function SearchBoxWithBtn({children, onClick1, onClick2}) {
    const [len, setLen] = useState(0);
    const {menu, icon} = children;
    return (
        <div className="w-full h-max md:w-[30%] flex gap-1 sm:gap-3">
            <div onClick={onClick1} className="h-12 bg-gray-200 w-12 rounded-xl flex items-center justify-center text-[#676767] md:hidden">
                {menu}
            </div>
            <div className="relative w-[70%] sm:w-[85%] h-12">
                <input
                    onChange={(e) => setLen(e.target.value.length)}
                    className="rounded-xl bg-gray-200 px-5 vazir-medium text-gray-500 h-[100%] w-[100%] text-right"
                    dir="rtl"
                />
                {len === 0 && (
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 vazir-medium pointer-events-none">
                        <span className="text-gray-500">جستجو</span>
                        <span className="text-[#00C0E8] hidden md:block text-[12px]">پزشک، تخصص، بیماری و ...</span>
                    </span>
                )}
            </div>
            <button type="button" onClick={onClick2} className="h-12 bg-gray-200 w-12 text-[#676767] rounded-xl flex items-center justify-center">
                {icon}
            </button>
        </div>
    )
}