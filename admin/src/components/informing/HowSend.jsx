import { useState } from "react";

export default function HowSend({getType}) {
    const [active, setActive] = useState('system')
    const roles = [{fa:"پیامک", en: "sms"},{fa:"مودال", en: "modal"},{fa:"پیام سیستمی", en: "system"}];
    return (
        <div className="w-full flex flex-row items-center gap-2">
            {
                roles.map((roleItem,index) => (
                    <button key={index} type="button" 
                    onClick={() => {setActive(roleItem.en);getType(roleItem.en)}} 
                    title={roleItem.en} 
                    className={`px-[14px] py-[7px] vazir-medium text-sm font-bold rounded-lg h-10 whitespace-break-spaces sm:whitespace-nowrap
                    ${active === roleItem.en ? "bg-[#E6F3FF] text-[#006ECF]" : "bg-gray-200 text-gray-500"}`}>{roleItem.fa}</button>
                ))
            }
        </div>
    )
}