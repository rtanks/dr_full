import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function financialService() {
    const dispatch = useDispatch();
    const baseUrl = "https://api.tda24.ir";
    const access = Cookies.get("accessTokenA");
    const headers = {
        "Authorization" : `Bearer ${access}`
    }
    const roles = ["کاربران","همه","پزشک","پرستار","آزمایشگاه","تصویر برداری","پیک"];
    const getFinancialWithRole = async (role1) => {
        return await axios.get(`${baseUrl}/adminpanel/adminpanel/financial/${role1}/`, {headers: headers}).then(res => {
            console.log(res)
            return res;
        }).catch(err => {
            console.log(err)
            return err
        })
    }
    
    return {roles, getFinancialWithRole}
}