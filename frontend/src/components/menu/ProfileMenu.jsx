import { useEffect } from "react";
import userService from "../../services/api/userService";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getInfo } from "../../slices/requestSlice";
import { BiLogOut } from "react-icons/bi";
import CheckAuth from "../../services/hook/CheckAuth";
import HeaderAuth from "../../services/api/headerAndUrlService";
import { HiOutlineUserCircle } from "react-icons/hi";
import Loading from "../Loading";

export default function ProfileMeu() {
    const {logout} = CheckAuth();
    const {imageUrl} = HeaderAuth()
    const dispatch = useDispatch();
    const {getUser} = userService()
    const { data, isLoading, isPending } = useQuery({queryKey: ['user'], queryFn:() => getUser()})
    useEffect(() => {
        if(!isPending) {
            console.log(data.data)
            dispatch(getInfo({fullName: data.data.fullName, nationalCode: data.data.nationalCode, 
                phoneNumber: data.data.phoneNumber, profileImage: data.data.profileImage, birthday: data.data.birthday, city: data.data.city,
                province: data.data.province, location: data.data.location , address: data.data.address
            }))
        }
    },[data])
    if(isLoading) return <Loading/>
    return (
        <div className="w-full h-full flex flex-row items-center justify-between gap-2">
            <div className="w-max h-max flex flex-row items-center gap-2">
                {
                    data?.data?.profileImage ? (
                        <img src={`${imageUrl}/${data?.data?.profileImage}`} alt='profile' className='w-14 h-14 rounded-xl'/>
                    ) : (
                        <div className='w-[52px] h-[52px] rounded-xl bg-[#f1f1f1] flex justify-center items-center text-2xl'>
                            <HiOutlineUserCircle color="#888" size={40}/>
                        </div>
                    )
                }

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