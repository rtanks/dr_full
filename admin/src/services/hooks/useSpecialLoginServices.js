import { useState } from "react";

export default function useSpecialLoginServices() {
    const [info, setInfo] = useState({
        role: {value: null, error: null},
        nationalCode: {value: null, error: null},
        password: {value: null, error: null}
    });
    const getRole = (role) => {
        setInfo(prev => ({...prev, role: role}))
    }
    const checkNationalCode = (e) => {
        if(e.target.value.length == 10) {
            setInfo(prev => ({...prev, nationalCode: {value: e.target.value, error: null}}))
        } else if(e.target.value.length < 10 && e.target.value.length > 0) {
            setInfo(prev => ({...prev, nationalCode: {value: null, error: "کد ملی وارد شده صحیح نمی باشد"}}))
        } else if(e.target.value.length <= 0){
            setInfo(prev => ({...prev, nationalCode: {value: null, error: "وارد کردن کدملی الزامی است"}}))
        }
    }
    const checkEmptyPassword = (e) => {
        if(e.target.value == "" || e.target.value == null) {
            setInfo(prev => ({...prev, password: {value: e.target.value, error: "وارد کردن پسورد الزامی است"}}))
        } else {
            setInfo(prev => ({...prev, password: {value: e.target.value, error: null}}))
        }
    }
    const disabledChecker = () => {
        if((info.password.value  == null || info.password.value  == '') || (info.nationalCode.value == null) || (info.role.value == null)) {
            return true;
        } else {
            return false;
        }
    }

    return {getRole ,disabledChecker, checkNationalCode, checkEmptyPassword, info}
}