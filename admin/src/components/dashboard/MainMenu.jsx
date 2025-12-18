import { NavLink } from "react-router-dom"
import classNames from "classnames"
import { HiOutlineCurrencyDollar, HiOutlinePencilSquare } from "react-icons/hi2";
import { IoEyeOutline, IoRocketOutline } from "react-icons/io5";
import { LiaAngleRightSolid, LiaUserInjuredSolid } from "react-icons/lia";
import { BiComment, BiMoneyWithdraw } from "react-icons/bi";
import { GoHistory } from "react-icons/go";
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function MainMenu({toggle, changeToggleStatus}) {
    
    const activeItem = (status) => {
        let activeClass = classNames({
            "flex flex-row gap-[10px] items-center py-2 px-3 rounded-lg text-[#676767]": true,
            "bg-blue-50": status,
            "bg-white": !status,
            "md:px-2": toggle
        })
        return activeClass;
    }
    let iconClassName = classNames({
        "md:w-7 md:h-6 w-6 h-6": toggle,
        "w-6 h-6": !toggle,
        "text-[#b5b5b5]":true
    })
    const controllers = useAnimationControls();
    const container = useRef();
    const closeDrawerAnimate = async () => {
        await controllers.start('true')
        // await for create delay for done animation complete and execute next command
        changeToggleStatus()
        controllers.start('exit');
    }
   useEffect(() => {
    if(toggle) {
        controllers.start('false');
    }
   }, [toggle])
    return (
         <div onClick={closeDrawerAnimate} className={`w-full h-full bg-[#0004] ${toggle? "block fixed right-0 top-0 z-50":"hidden sm:block translate-0 sm:w-1/6"} vazir-medium overflow-y-scroll`}>
            <motion.div ref={container} onClick={(e) => e.stopPropagation()} 
                animate={controllers} variants={{
                false: {translateX: [400,0], transition: {duration: 0.5}},
                true: {translateX: [0,400], transition: {duration: 0.5}},
                exit: {translateX: [400,0], transition: {duration: 0.1}},}}
                className={`w-64 sm:w-full origin-right bg-white ml-auto h-full relative overflow-y-scroll flex flex-col px-2 gap-2`}>
                <div onClick={changeToggleStatus} className={"block md:hidden absolute left-2 top-[26px] text-[#909090] text-md "}>
                    <LiaAngleRightSolid size={24}/>
                </div>
                <h1 className={`line-clamp-1 text-center text-2xl py-3 text-[#909090] font-bold`}>TDA۲۴.IR</h1>
                <NavLink to={"/dashboard/need-for-action"} className={({isActive}) => activeItem(isActive)}>
                    <IoRocketOutline size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>نیاز به اقدام</span>
                </NavLink>
                <NavLink to={"/dashboard/payment"} className={({isActive}) => activeItem(isActive)}>
                    <IoEyeOutline size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>نیاز به پرداخت</span>
                </NavLink>
                <NavLink to={"/dashboard/record-doctor"} className={({isActive}) => activeItem(isActive)}>
                    <HiOutlinePencilSquare size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>ثبت پزشک</span>
                </NavLink>
                <NavLink to={"/dashboard/currency"} className={({isActive}) => activeItem(isActive)}>
                    <HiOutlineCurrencyDollar size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>قیمت گزاری</span>
                </NavLink>
                <NavLink to={"/dashboard/comments"} className={({isActive}) => activeItem(isActive)}>
                    <BiComment size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>نظر کاربران</span>
                </NavLink>
                <NavLink to={"/dashboard/patient"} className={({isActive}) => activeItem(isActive)}>
                    <LiaUserInjuredSolid size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>بیمار</span>
                </NavLink>
                <NavLink to={"/dashboard/request-withdraw"} className={({isActive}) => activeItem(isActive)}>
                    <BiMoneyWithdraw size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>درخواست برداشت</span>
                </NavLink>
                <NavLink to={"/dashboard/financial-history"} className={({isActive}) => activeItem(isActive)}>
                    <GoHistory size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>سابقه مالی</span>
                </NavLink>
                <NavLink to={"/dashboard/informing"} className={({isActive}) => activeItem(isActive)}>
                    <GoHistory size={24} className={iconClassName}/>
                    <span className={`text-[14px] text-[#676767]`}>اطلاع رسانی به بیمار</span>
                </NavLink>
            </motion.div>
        </div>
    )
}