// import useGetDateCreated from '../../services/hook/useGetDateCreated'
// import { transformFormat } from '../../services/func/transformFunc';

import { MdOutlineMessage, MdOutlineSupportAgent } from "react-icons/md";
import { HiOutlineUserCircle } from "react-icons/hi2";


export default function HeaderTabMenu({text, titleRequest, keyRequest}) {
    // const {dateTime} = useGetDateCreated();
    const getIconForHeader = (size, key) =>{
        switch(key) {
            case 'message-box': return (<MdOutlineMessage size={size}/>)
            case 'support': return (<MdOutlineSupportAgent size={size}/>)
            case 'profile': return (<HiOutlineUserCircle size={size}/>)
            default: return (<MdOutlineSupportAgent size={size}/>)
        }
    }
    return (
        <div className="w-full h-[12%] sm:h-[12%] bg-white rounded-2xl border-2 border-main mb-1 flex flex-row justify-between items-center px-1 sm:px-3">
            <div className="w-max h-max flex flex-row items-center gap-3">
                <div className='w-12 h-12 rounded-xl bg-white border border-gray-400 flex justify-center items-center text-2xl'>
                    {
                        getIconForHeader(25, keyRequest)
                    }
                </div>
                {/* <IoAlertCircleOutline size={24} className='text-757575'/> */}
                <div className='w-max h-max flex gap-1 flex-col'>
                    <span className='text-md font-bold'>{titleRequest || 'سوالات متداول / پشتیبانی'}</span>
                    <span className='text-sm text-676767 font-bold'>{text}</span>
                </div>
            </div>
            {/* <div className="w-max h-max flex flex-col gap-2">
            </div> */}
        </div>
    )
}