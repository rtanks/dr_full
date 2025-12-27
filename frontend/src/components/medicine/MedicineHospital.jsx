import { useState } from "react";
import { CiPill } from 'react-icons/ci';
import { BiInjection } from "react-icons/bi";
import { showTimeFreq } from "../../services/func/medicineFunc";
import ItemSelector from "../general/ItemSelector";
import ManagementMedicine from "./ManagementMedicine";

export default function MedicineHospital({medicines}) {
    const itemsYesNo = [{id: 'yes', text: 'بله'}, {id: 'no', text: 'نه'}];
    const [showSettingMedicine, setShowSettingMedicine] = useState('');
    const getShowStatusSetting =  (item) => {
        setShowSettingMedicine(item);
    }
    const showIcon = (name) => {
        if(name.includes('آمپول')) {
            return <BiInjection size={24}/>
        } else {
            return <CiPill size={24}/>
        }
    }
    return (
        <div className="w-full h-max flex flex-col gap-2 mt-5">
            <div className="bg-gray-50 p-4 flex flex-col gap-2 rounded-xl text-md border border-gray-100 my-2 animate-in fade-in zoom-in duration-500">
                {
                    medicines ? (
                        medicines.map(medicine => (
                            <div key={medicine?.id} className='w-full sm:w-max h-max flex flex-row gap-1.5'>
                                <span className='w-max'>{showIcon(medicine?.name)}</span>
                                <div className='w-max h-max flex flex-row items-center flex-wrap gap-1 text-sm'>
                                    <span>{medicine.count} عدد {medicine?.name}</span>
                                    <span> {medicine.dose}</span>/
                                    <span>{showTimeFreq(medicine.freq)}</span>
                                </div>
                            </div>
                        ))
                    ) : ("")
                }
            </div>
            <div className="w-full h-max flex flex-row items-center gap-5">
                <p className="mt-5 pb-3">آیا تمایل به یاد آوری زمان مصرف دارو دارید؟</p>
                <div className="w-max h-max flex flex-row items-center gap-1.5">
                    <ItemSelector items={itemsYesNo} disabled={showSettingMedicine} getItem={getShowStatusSetting} activeItem={showSettingMedicine}/>
                </div>
            </div>
            <p>در صورت تنظیم زمان مصرف تداخلات دارویی و مراقبت های حین مصرف در دسترس است.</p>
            {showSettingMedicine && <ManagementMedicine medicines={medicines}/>}
        </div>
    )
}