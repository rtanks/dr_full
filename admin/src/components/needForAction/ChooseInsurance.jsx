import { useEffect, useRef, useState } from 'react'
import TooltipText from './TooltipText';

export default function ChooseInsurance({getInsurance, register}) {
    const [active, setActive] = useState('free')
    const insuranceSelector = [
        { insuranceName: "آزاد", insuranceKey:"free"},
        { insuranceName: "نیروهای مسلح", insuranceKey: "armedforces" },
        { insuranceName: "سلامت", insuranceKey: "healthy" },
        { insuranceName: "تامین اجتماعی", insuranceKey: "socialsecurity" },
    ]
    useEffect(() => {
        getInsurance("آزاد");
    },[])

    return (
        <div className='w-full h-max flex flex-col gap-5 mb-10'>
            <div className='w-full font-bold text-[#262626] text-md text-bold mx-auto'>انتخاب بیمه</div>
            <TooltipText text={'پوشش بیمه سلامت با نام های دیگری همچون روستایی، سر تختی، خدمات درمانی و ایرانیان نیز شناخته میشود؛ پس در صورتی که دارای هرکدام از موارد ذکر شده میباشید گزینه سلامت را انتخاب کنید'}/>
            <div {...register} tabIndex={-1} className='w-full mx-auto flex gap-1 items-stretch justify-start relative'>
                {insuranceSelector.map((insurance) => (
                        <div onClick={() => {setActive(insurance.insuranceKey);getInsurance(insurance.insuranceName)}}
                        className={`text-[12.5px] sm:text-sm font-bold hover:cursor-pointer border rounded-lg px-4 py-2 flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis  
                        ${active === insurance.insuranceKey ? 'bg-select-container text-main border-main' : 'bg-[#f7f7f7]  text-[#888] border-[#aaa]'}`}
                        key={insurance.insuranceKey}
                    >
                        {insurance.insuranceName}
                    </div>
                ))}
            </div>
        </div>
    )
}
