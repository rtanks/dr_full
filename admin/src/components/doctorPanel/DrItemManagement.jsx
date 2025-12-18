import classNames from "classnames";
import { useState } from "react";
import { LiaAngleLeftSolid } from "react-icons/lia";

export default function DrItemManagement({status, pay, title, text, children, onClick}) {
    const [statusItem, setStatusItem] = useState(status);
    const changeStatusItem = () => {
        setStatusItem(prev => !prev)
        onClick();
    }
    const showStatus = classNames({
            "text-[#00C313] bg-[#CDF2D3]": statusItem,
            "text-[#676767] bg-[#e9e9e9]": !statusItem
        })

    return(
        <div className={`w-[366px] h-[120px] vazir-medium flex flex-col items-center rounded-[15px] p-2 border border-[#909090aa] ${statusItem? "shadow-md" : ""}`}>
            <div className="w-full h-3/4 flex flex-row items-start justify-between">
                <div className="w-full h-3/4 flex flex-row items-center gap-3 pr-2">
                    <span className={statusItem? "text-[#676767]" : "text-[#0005]"}>
                        {children}
                    </span>
                    <div className="flex flex-col">
                        <span className={`${statusItem ? "text-black" : "text-[#0005]"} text-[16px]`}>{title}</span>
                        <span className={`${statusItem ? "text-[#676767]" : "text-[#0005]"} text-[12px]`}>{text}</span>
                    </div>
                </div>
                <div onClick={changeStatusItem} className={`w-[84px] h-10 hover:cursor-pointer flex justify-center items-center text-[16px] rounded-[10px] ${showStatus}`}>
                    {
                        statusItem ? "فعال" : "غیر فعال"
                    }
                </div>
            </div>
            <div className="w-full h-1/4 pt-1 flex flex-row justify-between items-center border-t border-t-[#efefef]">
                <span className={`${status? "text-[#676767]" : "text-[#0005]"} text-[16px]`}>
                    ویزیت {pay} تومان
                </span>
                <button type="button" onClick={onClick} className="text-[16px] hover:cursor-pointer flex flex-row text-[#006ECF]">
                    تنظیمات
                    <LiaAngleLeftSolid size={24}/>
                </button>
            </div>
        </div>
    )
}