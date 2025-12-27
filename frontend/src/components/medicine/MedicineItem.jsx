import { CiPill } from 'react-icons/ci';
import { BiInjection } from "react-icons/bi";
import { showTimeFreq } from '../../services/func/medicineFunc';

export default function MedicineItem({medicine, onClick}) {
    const showIcon = () => {
        if(medicine?.name?.includes('آمپول')) {
            return <BiInjection size={24}/>
        } else {
            return <CiPill size={24}/>
        }
    }
    return (
        <div className="w-full h-[65px] sm:h-[65px] rounded-lg border-r-2 border-main flex flex-row gap-2 items-center bg-[#f1f1f1] px-1.5 justify-between">
            <div className='w-4/5 sm:w-max h-max flex flex-row gap-1.5'>
                <span className='w-max'>{showIcon()}</span>
                <div className='w-max h-max flex flex-row items-center flex-wrap gap-1 text-sm'>
                    <span>{medicine.count} عدد {medicine?.name}</span>
                    <span> {medicine.dose}</span>/
                    <span>{showTimeFreq(medicine.freq)}</span>
                    {/* <span>{medicine?.name}</span>
                    <span> / {medicine.count} عدد / مصرف هر 6 ساعت</span> */}
                </div>
            </div>
            <div className=''>
                <button type='button' onClick={onClick} 
                className='w-max h-max px-1.5 py-0.5 text-sm rounded-md sm:rounded-lg text-white bg-main'
                >تنظیمات</button>
            </div>
        </div>
    )
}