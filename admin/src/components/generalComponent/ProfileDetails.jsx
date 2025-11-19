import { LiaAngleLeftSolid } from "react-icons/lia";

export default function ProfileDetails({image, name, experties, onClick}) {
    return(
        <div className="w-full h-[62px] vazir-medium  flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-[14px]">
                {image ? 
                    <img src={image} alt="profile image" className="w-[62px] h-[62px] text-xs bg-[#d9d9d9] rounded-full"/>
                :
                    <div className="w-[62px] h-[62px] text-xs bg-[#d9d9d9] rounded-full"></div>
                }
                <div className="flex flex-col">
                    <span className="text-[16px] text-[#5f5f5f]">{name}</span>
                    <span className="text-[14px] text-[#b2b2b2]">{experties}</span>
                </div>
            </div>
            <button type="button" onClick={onClick}>
                <LiaAngleLeftSolid size={24} className="text-[#5f5f5f]"/>
            </button>
        </div>
    )
}