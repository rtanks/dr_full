import { useEffect } from "react";
import userService from "../../services/api/userService";
import { useQuery } from "@tanstack/react-query"
import profile from '../../assets/IMG_20230207_204057_763.jpg'

export default function ProfileMeu() {
    const {getUser} = userService()
    const { data, isLoading, isPending } = useQuery({queryKey: ['user'], queryFn:() => getUser()})
    useEffect(() => {
        if(!isPending) {
            console.log(data.data)
        }
    },[data])
    if(isLoading) return <p>isLoading....</p>
    return (
        <div className="w-full h-full flex flex-row items-center gap-2">
            <img src={profile} alt='profile' className='w-14 h-14 rounded-xl'/>
            <div className='w-max h-max flex flex-col'>
                <span className='font-bold'>{data.data.fullName}</span>
                <span className='text-sm text-zinc-500'>daniel.sul@gmail.com</span>
            </div>
        </div>
    )
}