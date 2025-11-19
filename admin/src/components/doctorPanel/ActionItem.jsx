import { LiaAngleLeftSolid } from "react-icons/lia";

export default function ActionItem({action, waitingTime, onClick, explain, name, nationalCode, start, end}) {
    return (
        <div className="w-full h-max vazir-medium bg-[#f0f0f0] rounded-[20px] p-4 flex flex-col gap-3 text-[14px] text-[#676767]">
            <div className="w-full flex flex-row items-center justify-between">
                <span className="text-[16px] text-black">{action}</span>
                <LiaAngleLeftSolid size={24} onClick={onClick}/>
            </div>
            <div>{name} / {nationalCode}</div>
            <p className=" line-clamp-2">توضیحات : {explain}</p>
            <div className="w-full flex flex-row items-center justify-between">
                {
                    start ? (
                        <>
                            <span>شروع : {start}</span>
                            <span>پایان : {end}</span>
                        </> 
                    ) : "" 
                }
                <div className="w-max flex flex-row items-center">
                    <span>تا شروع مشاوره : </span>
                    <span className=" text-[#f00]">{waitingTime}</span>
                </div>
            </div>
        </div>
    )
}