import classNames from "classnames"
import { GoHistory } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaHandsHelping } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";


export default function NavBar({activeSnap, scrollHandler}) {
   const active = (val) => {
    return classNames({
        'text-[#2C8073] drop-shadow-my': val === activeSnap,
        'text-black': !val === activeSnap
    })
   }
    return (
        <div className="w-full h-16 shadow-my flex sm:hidden flex-row items-center justify-evenly bg-white sticky bottom-0 left-0 right-0">
            <div onClick={() => {scrollHandler('snap1')}} className={`w-max h-max items-center flex flex-col gap-1 ${active('snap1')}`}>
                <FaHandsHelping size={24}/>
                <span className="text-xs">خدمات پزشکی</span>
            </div>
            <div onClick={() => {scrollHandler('snap2')}} className={`w-max h-max items-center flex flex-col gap-1 ${active('snap2')}`}>
                <BiLoaderCircle size={26}/>
                <span className="text-xs">در حال انجام</span>
            </div>
            <div onClick={() => {scrollHandler('snap3')}} className={`w-max h-max items-center flex flex-col gap-1 ${active('snap3')}`}>
                <GoHistory size={23}/>
                <span className="text-xs">سابقه درمان</span>
            </div>
        </div>
    )
}