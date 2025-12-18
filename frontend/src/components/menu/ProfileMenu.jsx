import { useEffect } from "react";
import userService from "../../services/api/userService";
import { useQuery } from "@tanstack/react-query"
import profile from '../../assets/IMG_20230207_204057_763.jpg'
import { useDispatch } from "react-redux";
import { getInfo } from "../../slices/requestSlice";
import { BiLogOut } from "react-icons/bi";
import CheckAuth from "../../services/hook/CheckAuth";

export default function ProfileMeu() {
    const {checkAuthUser, logout} = CheckAuth();
    const dispatch = useDispatch();
    const {getUser} = userService()
    const { data, isLoading, isPending } = useQuery({queryKey: ['user'], queryFn:() => getUser()})
    useEffect(() => {
        if(!isPending) {
            console.log(data.data)
            dispatch(getInfo({fullName: data.data.fullName, nationalCode: data.data.nationalCode, 
                phoneNumber: data.data.phoneNumber, birthday: data.data.birthday, city: data.data.city,
                province: data.data.province, location: data.data.location , address: data.data.address
            }))
        }
    },[data])
    if(isLoading) return <p>isLoading....</p>
    return (
        <div className="w-full h-full flex flex-row items-center justify-between gap-2">
            <div className="w-max h-max flex flex-row items-center gap-2">
                <img src={profile} alt='profile' className='w-14 h-14 rounded-xl'/>
                <div className='w-max h-max flex flex-col'>
                    <span className='font-bold'>{data.data.fullName}</span>
                    <span className='text-sm text-zinc-500'>{data.data.phoneNumber}</span>
                </div>
            </div>
            <div>
                <div onClick={() => {logout();navigate('/');}} className="w-max hover:cursor-pointer h-max flex flex-row items-center gap-1 text-sm">
                        <BiLogOut size={25}/>
                        <span>خروج</span>
                 </div> 
            </div>
        </div>
    )
}