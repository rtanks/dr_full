import { FaCircleInfo } from "react-icons/fa6";

export default function TooltipText({text}) {
    return (
        <div className="w-full h-max border border-[#ffcc80] rounded-lg py-3 text-sm px-2 text-[#8d6e63] bg-[#fff3e0]">
            <FaCircleInfo size={17} color="#ff9800" className=" inline-block ml-2 mb-1"/>
            {text}
        </div>
    )
}