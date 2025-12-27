import { useEffect, useState } from "react";
import RegisterInfoModal from "../components/RegisterInfoModal";
import NavBar from "../layout/NavBar";
import { closeModal } from "../slices/modalSlice";
import { useDispatch, useSelector } from 'react-redux';
import EditInfoModal from "../components/EditInfoModal";
import DropDownComp from "./DropDownComp";
import ManagementDoctors from "../components/doctor/ManagementDoctors";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeaderAuth from "../services/api/headerAndUrlService";

export default function Home2() {
    const modalItem = useSelector(state => state.modal.showItem);
    const {baseUrl, headers} = HeaderAuth()
    const dispatch = useDispatch();
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [doctorsFilter, setDoctorsFilter] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const getDoctorFilter = (val) => { setDoctorsFilter(val); }

    const getDataUserEdit = (data) => {
        console.log('edit', data)
        setDataUserEdit(data);
    }
    const {data, isLoading, isPending, isError} = useQuery({queryKey: ['doctorsHospital'], queryFn: async () => {
        const response = await axios.get(`${baseUrl}/hospital/doctors/`, 
            {headers});
        console.log(response);
        return response;
    }})
    useEffect(() => {
        const THEME_KEY = 'tododr_theme_v1';
        function applyTheme(t){
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem(THEME_KEY, t);
        }
        const savedTheme = localStorage.getItem(THEME_KEY) || 'semi-dark';
        applyTheme(savedTheme);
    }, [])
    useEffect(() => {
        if(!isPending) {
            console.log(data.data)
            setDoctors(data.data);
            if(data.data == []) {
                setDoctorsFilter([""])
            } else {
                console.log(["",...data.data.filter( item => item.activate == true).map(item => item.fullName)])
                setDoctorsFilter(["",...data.data.filter( item => item.activate == true).map(item => item.fullName)])
            }
        }
    }, [data])
    const showModalFun = () => {
        switch(modalItem){
            case "registerInfo": return <RegisterInfoModal close={() => dispatch(closeModal())}/>;
            case "editInfo": return <EditInfoModal initialData={dataUserEdit} close={() => dispatch(closeModal())}/>
            case "managementDoctors": return <ManagementDoctors doctors={doctors} close={() => dispatch(closeModal())}/>;
        }
    }
    
    if(isLoading) return <p>isLoading...</p>
    if(isError) return <p>isError...</p>
    return (
        <>
            <NavBar/>
            {/* <DropDownElements getDataPatient={getDataUserEdit}/> */}
            <DropDownComp doctors={doctorsFilter} getDataPatient={getDataUserEdit} getDoctorFilter={getDoctorFilter}/>
            
            {
                showModalFun()
            }
        </>
    )
}