import React, { useState } from "react";
export default function SearchBoxWithoutMenu({children}) {
    const [len, setLen] = useState(0);
    return (
        <div className="w-full md:w-[30%] hidden md:flex gap-2 md:gap-4">
            <div className="relative w-[85%] h-13">
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
            <div className="h-13 bg-gray-200 w-13 text-[#676767] rounded-xl flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}