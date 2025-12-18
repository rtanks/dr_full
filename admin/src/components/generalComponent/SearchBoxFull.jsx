import React, { useState } from "react";

const SearchBoxFull = () => {
    const [len, setLen] = useState(0);

    return (
        <div className="relative w-full h-13">
            <input
                onChange={(e) => setLen(e.target.value.length)}
                className="rounded-xl bg-gray-200 px-5 vazir-medium text-gray-500 h-[100%] w-[100%] text-right"
                dir="rtl"
            />
            {len === 0 && (
                <span className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 vazir-medium pointer-events-none">
                    <span className="text-gray-500">جستجو</span>
                    <span className="text-[#00C0E8] text-[12px]">پزشک، تخصص، بیماری و ...</span>
                </span>
            )}
        </div>
    );
};

export default SearchBoxFull;
