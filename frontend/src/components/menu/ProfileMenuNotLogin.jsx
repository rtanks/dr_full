import RegisterOrLogin from "./RegisterOrLogin";
import { HiOutlineUserCircle } from "react-icons/hi2";

export default function ProfileMeuNotLogin() {
    return (
        <div className="w-full h-full flex flex-row items-center justify-between pb-1">
            <div className='w-[52px] h-[52px] rounded-xl bg-[#f1f1f1] flex justify-center items-center text-2xl'>
                <HiOutlineUserCircle color="#888" size={40}/>
            </div>
            <RegisterOrLogin/>
        </div>
    )
}