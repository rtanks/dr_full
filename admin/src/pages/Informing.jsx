import SearchBox from "../components/informing/SearchBox";
import HowSend from "../components/informing/HowSend";
import { useEffect, useState } from "react";
import axios from "axios";
import headersAndUrlBaseService from "../services/api/headersAndUrlBaseService";
import {useForm} from 'react-hook-form';
import { AiOutlineCheck } from 'react-icons/ai';
import Loading from "../components/Loading";
import { useQuery } from '@tanstack/react-query';
import UserItemInforming from "../components/informing/UserItemInforming";
import informingService from "../services/api/informingService";

export default function Informing() {
    const {baseUrl, headers} = headersAndUrlBaseService();
    const [selectAll, setSelectAll] = useState(false);
    const [users, setUSers] = useState([]);
    const [usersSelected, setUserSelected] = useState({ids: [], users: []})
    const {register, handleSubmit, setValue, reset, formState:{isValid}} = useForm();
    const getType = (val) => { setValue('type', val); } 
    const getFilterUsers = (usersFiltered) => { setUSers(usersFiltered); }
    const getUsersSelected = (usersSelect) => { setUserSelected(usersSelect); }

    useEffect(() => {
        if(selectAll) {
            setUserSelected({ids: users.map(user => user._id), users: users});
        } else {
            setUserSelected({ids: [], users: []});
        }
    }, [selectAll])
    const {createMessageMutation} = informingService();
    const onSubmit = (data) => {
        console.log(usersSelected)
        console.log({type: 'system', ...data, usersId: usersSelected.ids})
        createMessageMutation.mutate({type: 'system', ...data, usersId: usersSelected.ids})
        reset()
    }
    const {data, isLoading, isPending} = useQuery({queryKey: ['patients'], queryFn: async () => {
      const response = await axios.get(`${baseUrl}/admin/patients/`, {headers});
      console.log(response.data);
      setUSers(response.data)
      return response.data;
    }})
    if(isLoading) return <Loading/>
    return (
        <>
           <div className="w-full h-max flex flex-col gap-5 bg-transparent vazir-medium">
              <div className="w-full h-max flex flex-col gap-2">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-max flex flex-col gap-4">
                    <div className="w-max flex flex-row items-center gap-3 mt-4">
                        <SearchBox usersAll={data} getUsersFiltered={getFilterUsers}/>
                    </div>
                    <div className="w-full h-max flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className="w-max flex flex-row items-center gap-3">
                            <span className="text-sm text-[#676767] w-max whitespace-nowrap">ارسال با</span>
                            <HowSend getType={getType}/>
                        </div>
                        <input {...register("title", {required: true})} className="border border-[#aaa] h-10 rounded-lg px-2 w-full sm:w-[37.2%]" placeholder="سر فصل:"/>
                        <input {...register("link", {required: true})} className="border border-[#aaa] h-10 rounded-lg px-2 w-full sm:w-[37.2%]" placeholder="رفتن به"/>
                    </div>
                    <div className="w-full flex flex-row items-center gap-2">
                        <button type="button" onClick={() => setSelectAll(!selectAll)} className="w-14 h-10 flex justify-center items-center border-2 border-[#a7a7a7] rounded-sm">
                            {
                                selectAll ? (
                                    <AiOutlineCheck size={24} color="#a7a7a7"/>
                                ) : (
                                    ""
                                )
                            }
                        </button>
                        <input {...register('text',{required: true})} className="border border-[#aaa] h-10 rounded-lg px-2 w-full" placeholder="متن پیام:"/>     
                        <button type="submit" disabled={!isValid} className={`${isValid ? "bg-primary-blue text-white" : "bg-[#efefef] text-[#676767]"} rounded-[10px] w-1/4 h-10`}>ارسال</button>              
                    </div>
                </form>
                <div className="w-full h-max py-5 flex flex-col gap-2">
                    {
                        users.length != 0 ? (
                            users.map(user => (
                                <UserItemInforming key={user._id} user={user} selectAll={selectAll} selectedUsers={usersSelected} getUsersSelected={getUsersSelected}/>
                            ))
                        ) : ("")
                    }
                </div>
              </div>
            </div> 
        </>
    )
}