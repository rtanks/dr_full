import useGetDateCreated from '../../services/hook/useGetDateCreated'
import { transformFormat } from '../../services/func/transformFunc';
import { CtScanIcon, DoctorICon, GraphIcon, MedicineIcon, MriIcon, PhysiotherapyIcon, StripTestIcon, TestIcon, TransportIcon, UltrasoundIcon } from '../../layout/Icons';
import classNames from 'classnames';


export default function HeaderRequestStatus({typeRequest, titleRequest, keyRequest, statusRequest, time, date}) {
    const {dateTime} = useGetDateCreated();
    const getIconForHeader = (size, color, key) =>{
        switch(key) {
            case 'mri': return (<MriIcon size={size} color={color}/>)
            case 'graph': return (<GraphIcon size={size} color={color}/>)
            case 'ct-scan': return (<CtScanIcon size={size} color={color}/>)
            case 'ultrasound': return (<UltrasoundIcon size={size} color={color}/>)
            case 'strip-test': return (<StripTestIcon size={size} color={color}/>)
            case 'physiotherapy': return (<PhysiotherapyIcon size={size} color={color}/>)
            case 'test': return (<TestIcon size={size} color={color}/>)
            case 'medicine': return (<MedicineIcon size={size} color={color}/>)
            case 'transport': return (<TransportIcon size={size} color={color}/>)
            case 'visit-doctor': return (<DoctorICon size={size} color={color}/>)
        }
    }
    const statusServiceClass = classNames({
        'text-failed': 'پرداخت نشده' == statusRequest,
        'text-select': 'پرداخت شده' == statusRequest,
        'text-main': 'درحال انجام' == statusRequest,
    })
    return (
        <div className="w-full h-[12.5%] sm:h-[12%] bg-white rounded-xl border-2 border-main mb-1 flex flex-row justify-between items-center px-1 py-[20px] sm:px-3">
            <div className="w-[66%] sm:w-max h-max flex flex-row items-center gap-3 bg-white">
                <div className='w-12 h-12 rounded-xl bg-white border border-gray-400 flex justify-center items-center text-2xl'>
                    {
                        getIconForHeader(24, '#676767', keyRequest)
                    }
                </div>
                {/* <IoAlertCircleOutline size={24} className='text-757575'/> */}
                <div className='w-max h-max flex gap-1 flex-col'>
                    <span className='sm:text-md font-bold'>{typeRequest}</span>
                    <span className='w-full h-max line-clamp-1 text-sm text-676767 font-bold'>{titleRequest}</span>
                </div>
            </div>
            <div className="w-max sm:w-max h-max flex flex-col gap-2">
                <span className={`${statusServiceClass} text-md text-left font-bold pl-1`}>{statusRequest}</span>
                <div className='w-max flex flex-col sm:flex-row gap-1 items-end text-898989 text-xs'>
                    {/* <span>ایجاد شده در </span> */}
                    <div className='w-max h-max flex flex-row gap-1 items-center'>
                        <span>{time ? time :transformFormat(dateTime.time)}</span>
                        <span>{date ? date :transformFormat(dateTime.date)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}