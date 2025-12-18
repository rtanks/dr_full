import { LiaAngleLeftSolid } from "react-icons/lia";

export  default function HistoryMoreServiceItem({title, explain, onClick}) {
    return (
        <div className="w-full bg-[#f7f7f7] rounded-[20px] vazir-medium flex text-[14px] flex-row items-center justify-between px-4 py-3">
            <div className="w-max flex flex-col">
                <span className="text-black">{title}</span>
                <span className="text-[#676767]">{explain}</span>
            </div>
            <LiaAngleLeftSolid size={24} color="#676767" onClick={onClick}/>
        </div>
    )
}