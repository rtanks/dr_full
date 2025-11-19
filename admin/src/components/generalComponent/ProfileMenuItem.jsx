import { LiaAngleLeftSolid } from "react-icons/lia";

export function ProfileMenuItem({children, title, route, onClick}) {
    return (
        <div to={route} className="w-full h-7 vazir-medium pr-[17px] flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-4">
                {children}
                <span className="text-[16px] text-[#5f5f5f]">{title}</span>
            </div>
            <LiaAngleLeftSolid size={24} className="text-[#5f5f5f]" onClick={onClick}/>
        </div>
    )
}

export function ProfileMenuItemWithoutAngle({children, title, route}) {
    return (
        <div to={route} className="w-full h-7 vazir-medium pr-[17px] flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-4">
                {children}
                <span className="text-[16px] text-[#5f5f5f]">{title}</span>
            </div>
        </div>
    )
}