import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import HeaderAuth from "../../services/api/headerAndUrlService.js";
// import doctorManagementService from "../../services/api/doctorManagementService.js";
import SetCities from "../general/SetCity.jsx";
import SetProvinces from "../general/SetProvinces.jsx";
import AddUserModal from "../general/AddUserModal.jsx";

export default function SearchWithCp({getUser}) {
    const [modal, setModal] = useState(false)
    const {baseUrl, headers} = HeaderAuth();
    const [valueInp, setValueInp] = useState('');
    const [provinceInitial, setProvinceInitial] = useState({ 
        id: 0, name: "",
        slug: "", tel_prefix: "",
    });
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const getCity = (key, value) => { setCity(value) }
    const getProvince = (key, value) => { setProvince(value) }

    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null)
    const inp = useRef()
    const searchWithCityProvinceFilter = (key, value, city, province) => {
        console.log(key, value, city, province)
        axios.get(`${baseUrl}/users/search/with-cp?key=${key}&value=${value}&province=${province}&city=${city}`, {headers}).then( res => {
            console.log('fullName',res.data)
            setShow(true)
            setUsers(res.data);
            setError(null)
        }).catch(err => {
            console.log(err);
            setError(err.response.data.message)
        })
    }
    const searchWithoutCp = (key, value) => {
        console.log(key, value)
        axios.get(`${baseUrl}/users/search/?key=${key}&value=${value}`, {headers}).then( res => {
            console.log('fullName',res.data)
            setShow(true)
            setUsers(res.data);
            setError(null)
        }).catch(err => {
            console.log(err);
            setError(err.response.data.message)
        })
    }
    const searchValue = (e) => {
        const searchVal = e.target.value;
        if(!(searchVal == '' || searchVal == null) && searchVal.length >= 2) {
            if(searchVal?.slice(0,2) == '09') {
                searchWithoutCp("phone", e.target.value);
                if(city && province) {
                    searchWithCityProvinceFilter("phoneNumber", e.target.value, city, province)
                } else {
                    console.log('hi')
                    searchWithoutCp("phoneNumber", e.target.value)
                }
            } else if(!isNaN(Number(searchVal))) {
                if(city && province) {
                    searchWithCityProvinceFilter("nationalCode", e.target.value, city, province)
                } else {
                    console.log('hi')
                    searchWithoutCp("nationalCode", e.target.value)
                }
            } else {
                if(city && province) {
                    searchWithCityProvinceFilter("fullName", e.target.value, city, province)
                } else {
                    console.log('hi')
                    searchWithoutCp("fullName", e.target.value)
                }
            }
        } else {
            setUsers([])
        }
    }
    // const {addDoctorMutation} = doctorManagementService()
    // const addDoctor = (id) => {
    //     addDoctorMutation.mutate({doctorId: id});
    // }
    return (
        <div className="mb-[15px] flex flex-col gap-1 relative">
            <div className="w-full flex flex-row gap-1">
                <SetProvinces setData={getProvince} province={provinceInitial.name} setProvince={setProvinceInitial}/>
                <SetCities setData={getCity} province={provinceInitial} data={city}/>
            </div>
            <div className="flex gap-2.5">
              <input type="text" ref={inp} onChange={(e) => {searchValue(e);setValueInp(e.target.value)}}
               id="newDoctorName" placeholder="جستو جوی کاربر با نام ،کدملی،شماره تلفن" 
               className="w-full h-12 px-5 outline-none rounded-xl border border-gray-300"/>
            </div>
            {
                valueInp != "" ? (
                    <div className={`w-full h-max ${show ? 'block' : "hidden"} 
                    border border-gray-300 shadow-xl 
                    absolute right-0 top-[110%] rounded-xl bg-white`}>
                        {
                            users.length == 0 ? (
                                <div className="p-3 text-sm text-red-500">کاربری یافت نشد</div>
                            ) : (
                                users.map(user => (
                                    <div onClick={() => {getUser(user);inp.current.value = user.fullName;setShow(false)}} 
                                    key={user._id} className="p-3 shadow-sm text-sm flex flex-row items-center justify-start gap-1">
                                        <span className="text-gray-600">{user.fullName}</span>/
                                        <span className="text-gray-600">{user.phoneNumber}</span>/
                                        <span className="text-gray-600">{user.nationalCode}</span>
                                    </div>
                                ))
                            )
                        }
                        <div onClick={() => setModal(true)} 
                        className="py-2.5 shadow-sm text-center font-bold bg-blue-50 rounded-b-xl text-blue-main">افزودن کاربر</div>
                    </div>
                ) : (
                    ""
                )
            }
            {error && <p className="text-sm text-red-700">{error}</p>}
            {modal && <AddUserModal close={() => setModal(false)}/>}
        </div>
    )
}