import { IoEyeOutline } from "react-icons/io5";
import UserItemBtn from "./UserItemBtn";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FiFileText, FiShoppingBag } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
import { BsTruck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function UserItem({name, number, time, date,style, getItemSelected}) {
    const navigate = useNavigate();
    return (
        <div className="w-full h-max md:h-[70px] vazir-medium text-[14px] py-[15px] sm:p-[15px] flex flex-col md:flex-row items-center gap-2 bg-white rounded-[20px]">
            <div className="w-full md:w-[40%] flex flex-row items-center justify-between">
                <div className="text-[#676767]">
                    <span className="text-[#006ECF]">{name}</span> / 
                    <span className="text-[#006ECF]">{number}</span>
                </div>
                <div className="flex flex-row gap-2 text-[14px] text-[#676767]">
                    <span>{time}</span>
                    <span>{date}</span>
                </div>
            </div>
            <div className={`w-full md:w-[60%] flex flex-row items-center flex-wrap pb-4 md:pb-0 gap-2 text-[#676767] ${style}`}>
                <UserItemBtn onClick={() => getItemSelected("triage")}>
                    تریاژ
                    <IoEyeOutline size={15}/>
                </UserItemBtn>
                <UserItemBtn onClick={() => getItemSelected("medicine")}>
                    دارو
                    <HiOutlinePencilSquare size={15}/>
                    <FiShoppingBag size={15}/>
                </UserItemBtn>
                <UserItemBtn onClick={() => getItemSelected("test")}>
                    آزمایش
                    <HiOutlinePencilSquare size={15}/>
                    <LuUserCheck size={15}/>
                    <FiShoppingBag size={15}/>
                    <FiFileText size={15}/>
                </UserItemBtn>
                <UserItemBtn onClick={() => getItemSelected("paraClinic")}>
                    پاراکلینیک
                    <HiOutlinePencilSquare size={15}/>
                    <FiShoppingBag size={15}/>
                    <FiFileText size={15}/>
                </UserItemBtn>
                <UserItemBtn>
                    پرستار
                    <LuUserCheck size={15}/>
                </UserItemBtn>
                <UserItemBtn onClick={() => getItemSelected("transportation")}>
                    حمل بیمار
                    <BsTruck size={15}/>
                </UserItemBtn>
                <UserItemBtn>
                    تجهیزات
                    <FiShoppingBag size={15}/>
                </UserItemBtn>
                
            </div>
        </div>
    )
}