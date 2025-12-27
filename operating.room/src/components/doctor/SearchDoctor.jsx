import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import HeaderAuth from "../../services/api/headerAndUrlService.js";
import doctorManagementService from "../../services/api/doctorManagementService.js";

export default function SearchDoctor({children, onClick1, onClick2}) {
    const {baseUrl, headers} = HeaderAuth()
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null)
    const inp = useRef()
    const [doctorSelected, setDoctorSelected] = useState({})
    const searchValue = (e) => {
        const searchVal = e.target.value;
        if(!(searchVal == '' || searchVal == null)) {
            axios.get(`${baseUrl}/doctors/search/doctor/${e.target.value}/`, {headers}).then( res => {
                console.log('fullName',res.data)
                setShow(true)
                setUsers(res.data);
                setError(null)
            }).catch(err => {
                console.log(err);
                setError(err.response.data.message)
            })
        } else {
            setUsers([])
        }
    }
    const {addDoctorMutation} = doctorManagementService()
    const addDoctor = (id) => {
        addDoctorMutation.mutate({doctorId: id});
    }
    return (
        <div className="mb-[15px] flex flex-col gap-1 relative">
            <div className="flex gap-2.5">
              <input type="text" ref={inp} onChange={(e) => {searchValue(e)}}
               id="newDoctorName" placeholder="نام پزشک جدید" style={{flex:1}}/>
              <button type="button" onClick={() => {addDoctor(doctorSelected._id);inp.current.value = "";}} className="btn primary h-10 py-1.5 px-2.5 font-old" id="addDoctorBtn">افزودن به لیست</button>
            </div>
            <div className={`w-[73%] h-max ${show ? 'block' : "hidden"} absolute right-[0.5px] top-[80%] rounded-b-xl bg-white`}>
                            {/* <div onClick={() => addDoctor(user._id)} key={user._id} className="p-2 shadow-sm">{user.fullName}</div> */}
                {
                    users.length == 0 ? (
                        ""
                    ) : (
                        users.map(user => (
                            <div onClick={() => {setDoctorSelected(user);inp.current.value = user.fullName;setShow(false)}} 
                            key={user._id} className="p-2 shadow-sm ">{user.fullName}</div>
                        ))
                    )
                }
            </div>
            {error && <p className="text-sm text-red-700">{error}</p>}
        </div>
    )
}