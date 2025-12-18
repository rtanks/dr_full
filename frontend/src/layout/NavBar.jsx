import classNames from "classnames"
import { GoHistory } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import { LiaClipboardListSolid } from "react-icons/lia";
import { FaHandsHelping } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import animatedIcon from '../assets/images/animated.svg'
import CheckAuth from "../services/hook/CheckAuth";
import { AboutIcon } from './Icons'
import { getNavBarText } from "../services/func/getTypeRequest";
import { MdOutlineMessage, MdOutlineSupportAgent } from "react-icons/md";
import { GrDocumentTime } from "react-icons/gr";
import { HiOutlineUserCircle } from "react-icons/hi2";

export default function NavBar({activeSnap, scrollHandler, changeActiveSnap}) {
    const getIconForHeader = (size, color, key) =>{
        switch(key) {
            case 'message-box': return (<MdOutlineMessage size={size}/>)
            case 'support': return (<MdOutlineSupportAgent size={size}/>)
            case 'about': return (<AboutIcon size={size}/>)
            case 'request': return (<GrDocumentTime size={size}/>)
            case 'profile': return (<HiOutlineUserCircle size={size}/>)
            case 'other': return (<img src={animatedIcon} alt="hi" className="w-[26px] h-[26px]"/>)
        }
    }
    const {checkAuthUser} = CheckAuth();
    const active = (val) => {
        return classNames({
            'text-[#2C8073] drop-shadow-my': val === activeSnap,
            'text-black': !val === activeSnap
        })
    }
    return (
        <div className="w-full h-16 border shadow-my flex sm:hidden flex-row items-center justify-evenly bg-white fixed bottom-0 left-0 right-0">
            <div onClick={() => {scrollHandler(1);changeActiveSnap(1)}} className={`w-max h-max items-center flex flex-col gap-1 ${active(1)}`}>
                <FaHandsHelping size={24}/>
                <span className="text-xs">خدمات پزشکی</span>
            </div>
            <div onClick={() => {scrollHandler(2);changeActiveSnap(2)}} className={`w-max h-max items-center flex flex-col gap-1 ${active(2)}`}>
                {activeSnap == 2 ? (
                    <>
                        {
                            getIconForHeader(24, '#676767', getNavBarText().key)
                        }
                    </>
                    ) : getNavBarText()?.key == 'other'? <BiLoaderCircle size={26}/>: getIconForHeader(24, '#676767', getNavBarText()?.key)}
                <span className="text-xs">{getNavBarText()?.name}</span>
            </div>
            <div onClick={() => {scrollHandler(3);changeActiveSnap(3)}} className={`w-max h-max items-center flex flex-col gap-1 ${active(3)}`}>
                {
                    checkAuthUser() ? (
                        <GoHistory size={23}/>
                    ): (
                        <AboutIcon size={23}/>
                    )
                }
                <span className="text-xs">
                    {
                        checkAuthUser()? "سابقه درمان": "درباره ما"
                    }
                </span>
            </div>
        </div>
    )
}