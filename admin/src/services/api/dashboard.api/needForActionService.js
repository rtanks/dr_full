import axios from "axios"
import Cookies from "js-cookie"
import HeaderAuth from "../../../../../frontend/src/services/api/headerAndUrlService"

export default function needForActionService() {
    const {baseUrl, headers} = HeaderAuth();
    const getTriages = async () => {
        try {
            const response = await axios.get(`${baseUrl}/adminpanel/dashboard/triages/`, {headers: headers})
            console.log(response);
            return response;
        } catch(err) {
            console.log(err)
            return err;
        }
    }

    const getMainInfo = async () => {
        return axios.get(`${baseUrl}/adminpanel/dashboard/main/`, {headers:headers}).then(res => {
            console.log(res)
            return res
        }).catch(err => {
            console.log(err)
            return err
        })
    }
//----------------------------------------------------
    const getDoctorsList = async () => {
        return axios.get(`${baseUrl}/doctors/list/`, {headers: headers}).then(res => {
            console.log(res)
            return res
        });
    }
    const getSamplersList = async () => {
        return axios.get(`${baseUrl}/adminpanel/dashboard/samplers/`, {headers: headers});
    }
    const getCouriersList = async () => {
        return axios.get(`${baseUrl}/adminpanel/dashboard/couriers/`, {headers: headers});
    }
    const getServiceCentersList = async (role) => {
        return axios.get(`${baseUrl}/adminpanel/dashboard/service-centers/${role}/`, {headers: headers});
    }
//----------------------------------------------------


    return {getTriages, getMainInfo, getDoctorsList, getSamplersList, getServiceCentersList,getCouriersList}
}