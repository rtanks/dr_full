import axios from "axios";
import React, { useState } from "react";
import headersAndUrlBaseService from "../../services/api/headersAndUrlBaseService";
import { useDispatch } from "react-redux";
import { getPatientInfo } from "../../slices/patientAction";

export default function SearchBoxWithBtn({children, onClick1, onClick2}) {
    const [len, setLen] = useState(0);
    const {menu, icon} = children;
    const {baseUrl, headers} = headersAndUrlBaseService()
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const getPatientInformation = (patient) => {
        dispatch(getPatientInfo({patient: {
            id: patient._id,
            fullName: patient.fullName,
            nationalCode: patient.nationalCode,
            phoneNumber: patient.phoneNumber,
        }}))
    }
    const searchValue = (e) => {
        const searchVal = e.target.value;
        if(!(searchVal == '' || searchVal == null)) {
            console.log(searchVal)
            if(searchVal?.slice(0,2) == '09') {
                axios.get(`${baseUrl}/users/admin/users/search?key=phoneNumber&&value=${e.target.value}`, {headers}).then( res => {
                    console.log('phoneNumber',res.data)
                    setUsers(res.data);
                }).catch(err => console.log(err))
            } else if(!isNaN(Number(searchVal))) {
                axios.get(`${baseUrl}/users/admin/users/search?key=nationalCode&&value=${e.target.value}`, {headers}).then( res => {
                    console.log('nationalCode',res.data)
                    setUsers(res.data);
                }).catch(err => console.log(err))
            } else {
                axios.get(`${baseUrl}/users/admin/users/search?key=fullName&&value=${e.target.value}`, {headers}).then( res => {
                    console.log('fullName',res.data)
                    setUsers(res.data);
                }).catch(err => console.log(err))
            }
        } else {
            setUsers([])
        }
    }
    return (
        <div className="w-full h-max md:w-[30%] flex gap-1 sm:gap-3">
            <div onClick={onClick1} className="h-12 bg-gray-200 w-12 rounded-xl flex items-center justify-center text-[#676767] md:hidden">
                {menu}
            </div>
            <div className="relative w-[70%] sm:w-[85%] h-12">
                <input
                    onChange={(e) => {setLen(e.target.value.length);searchValue(e)}}
                    className="rounded-xl bg-gray-200 px-5 vazir-medium outline-0 text-gray-500 h-[100%] w-[100%] text-right"
                    dir="rtl"
                />
                {len === 0 && (
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 vazir-medium pointer-events-none">
                        <span className="text-gray-500">جستجو بیمار با</span>
                        <span className="text-[#00C0E8] hidden md:block text-[12px]">کد ملی،نام،شماره تلفن...</span>
                    </span>
                )}
                <div className={"w-full absolute right-0 top-4/5 h-max bg-gray-200 flex flex-col rounded-b-xl"}>
                    {
                        users.map(user => (
                            <div key={user._id} onClick={() => {getPatientInformation(user);onClick2();}} className="w-full h-max px-3 py-2 mb-2 flex flex-row items-center text-sm gap-1">
                                <span className="w-max h-max text-[#006ECF]">{user.fullName}</span> /
                                <span className="w-max h-max text-[#006ECF]">{user.nationalCode}</span> /
                                <span className="w-max h-max text-[#006ECF]">{user.phoneNumber}</span> 
                            </div>
                        ))
                    }
                </div>
            </div>
            <button type="button" onClick={onClick2} className="h-12 bg-gray-200 w-12 text-[#676767] rounded-xl flex items-center justify-center">
                {icon}
            </button>
        </div>
    )
}