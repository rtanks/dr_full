import { IoAlertCircleOutline } from 'react-icons/io5'
import useGetDateCreated from '../../services/hook/useGetDateCreated'
import { transformFormat } from '../../services/func/transformFunc';

export default function HeaderRequestStatus({typeRequest, titleRequest, statusRequest, date, time}) {
    const {dateTime} = useGetDateCreated();
    console.log(dateTime)
    return (
        <div className="w-full h-[9vh] bg-transparent mb-1 flex flex-row justify-between items-center px-0 sm:px-3">
            <div className="w-max h-max flex flex-row items-center gap-3">
                <IoAlertCircleOutline size={24} className='text-757575'/>
                <div className='w-max h-max flex flex-col'>
                    <span className='text-md font-bold'>{typeRequest}</span>
                    <span className='text-sm text-676767 font-bold'>{titleRequest}</span>
                </div>
            </div>
            <div className="w-max h-max flex flex-col gap-1">
                <span className='text-main text-md text-left font-bold pl-1'>{statusRequest}</span>
                <div className='w-max flex flex-col sm:flex-row gap-1 items-center text-a7a7a7 text-xs'>
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