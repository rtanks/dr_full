import { IoAlertCircleOutline } from 'react-icons/io5'
import useGetDateCreated from '../../services/hook/useGetDateCreated'
import { transformFormat } from '../../services/func/transformFunc';
import { LuChartSpline } from "react-icons/lu";
import { FaXRay } from "react-icons/fa6"; 
import { TbMessage2 } from "react-icons/tb";
import { MriIcon } from '../../layout/Icons';
import { GrTest } from "react-icons/gr";
import { RiMedicineBottleLine } from "react-icons/ri";

export default function HeaderRequestStatus({typeRequest, titleRequest, keyRequest, statusRequest}) {
    const {dateTime} = useGetDateCreated();
    const getIconForHeader = (color, size, key) =>{
        switch(key) {
            case 'mri': return (<MriIcon color={color} size={size}/>)
            case 'graph': return (<FaXRay color={color} size={size}/>)
            case 'ct-scan': return (<MriIcon color={color} size={size}/>)
            case 'ultrasound': return (<TbMessage2 color={color} size={size}/>)
            case 'strip-test': return (<LuChartSpline color={color} size={size}/>)
            case 'physiotherapy': return (<LuChartSpline color={color} size={size}/>)
            case 'test': return (<GrTest color={color} size={size}/>)
            case 'medicine': return (<RiMedicineBottleLine color={color} size={size}/>)
            case 'transport': return (<LuChartSpline color={color} size={size}/>)
        }
    }
    return (
        <div className="w-full h-[9vh] bg-transparent mb-1 flex flex-row justify-between items-center px-1 sm:px-3">
            <div className="w-max h-max flex flex-row items-center gap-3">
                {
                    getIconForHeader('#757575', 24, keyRequest)
                }
                {/* <IoAlertCircleOutline size={24} className='text-757575'/> */}
                <div className='w-max h-max flex flex-col'>
                    <span className='text-md font-bold'>{typeRequest}</span>
                    <span className='text-sm text-676767 font-bold'>{titleRequest}</span>
                </div>
            </div>
            <div className="w-max h-max flex flex-col gap-1">
                <span className='text-main text-md text-left font-bold pl-1'>{statusRequest}</span>
                <div className='w-max flex flex-col sm:flex-row gap-1 items-end text-898989 text-xs'>
                    <span>ایجاد شده در </span>
                    <div className='w-max h-max flex flex-row gap-1 items-center'>
                        <span>{transformFormat(dateTime.date)}</span>
                        <span>{transformFormat(dateTime.time)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}