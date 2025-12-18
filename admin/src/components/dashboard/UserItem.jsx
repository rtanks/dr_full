import { IoEyeOutline } from "react-icons/io5";
import UserItemBtn from "./UserItemBtn";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FiFileText, FiShoppingBag } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
import { BsTruck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch} from 'react-redux';
import { getAllInfo } from "../../slices/requestSlice";

export default function UserItem({user,request, time, date,style, onClick, getItemSelected}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showAction = () => {
        const category = String(request?.category)
        switch(category) {
            case "triage" : return (
                <UserItemBtn onClick={() => getItemSelected("triage")}>
                    تریاژ
                    <IoEyeOutline size={15}/>
                </UserItemBtn>)
            case "medicine" : return (
                <UserItemBtn onClick={() => getItemSelected("medicine")}>
                    دارو
                    <HiOutlinePencilSquare size={15}/>
                    <FiShoppingBag size={15}/>
                </UserItemBtn>)

            case "test" : return (
                <UserItemBtn onClick={() => getItemSelected("test")}>
                    آزمایش
                    <HiOutlinePencilSquare size={15}/>
                    <LuUserCheck size={15}/>
                    <FiShoppingBag size={15}/>
                    <FiFileText size={15}/>
                </UserItemBtn>)
            case "doctorConsulting" : 
            case "paraClinic" : 
            return (
                <UserItemBtn onClick={() => {getItemSelected("paraClinic");
                    onClick({
                        fullName: user.fullName,
                        nationalCode: user.nationalCode,
                        phoneNumber: user.phoneNumber,
                        service: request.request.service,
                        insurance: request.request.insurance,
                        explain: request.request.explain,
                        area: request.request.area,
                        date: date,
                        time: time
                    })
                }}>
                    {request.request.service}
                    <HiOutlinePencilSquare size={15}/>
                    <FiShoppingBag size={15}/>
                    <FiFileText size={15}/>
                </UserItemBtn>)
            case "nurse" : return (
                <UserItemBtn>
                    پرستار
                    <LuUserCheck size={15}/>
                </UserItemBtn>)
            case "transport" : return (
                <UserItemBtn onClick={() => getItemSelected("transportation")}>
                    حمل بیمار
                    <BsTruck size={15}/>
                </UserItemBtn>
            )
            case "equipment" : return (
                <UserItemBtn>
                    تجهیزات
                    <FiShoppingBag size={15}/>
                </UserItemBtn>
            )
        }
    }
    useEffect(() => {
        console.log(user)
        console.log(request)
        // dispatch(getAllInfo({
        //     fullName: user.fullName,
        //     nationalCode: user.nationalCode,
        //     phoneNumber: user.phoneNumber,
        //     service: request.request.service,
        //     insurance: request.request.insurance,
        //     explain: request.request.explain,
        //     area: request.request.area,
        //     date: date,
        //     time: time
        // }))
    },[request])
    return (
        <div className={`w-full  ${style} h-max md:h-[70px] vazir-medium text-[14px] py-[15px] sm:p-[15px] flex flex-col md:flex-row items-center gap-2 bg-white sm:rounded-[20px]`}>
            <div className="w-full md:w-[20%] flex flex-row items-center justify-between">
                <div className="text-[#676767] w-max flex flex-row gap-1">
                    <span className="text-[#006ECF]">{user.fullName}</span> / 
                    <span className="text-[#006ECF]">{user.phoneNumber}</span>
                </div>
            </div>
            <div className={`w-full md:w-[68%] flex flex-row items-center flex-wrap pb-4 md:pb-0 gap-2 text-[#676767]`}>
                {
                    showAction()
                }
            </div>
            <div className="w-full md:w-[12%] flex flex-row gap-2 text-[14px] text-[#676767]">
                <span>{time}</span>
                <span>{date}</span>
            </div>
        </div>
    )
}