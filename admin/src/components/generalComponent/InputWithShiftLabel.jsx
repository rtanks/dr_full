import { useRef, useState } from "react"
import {transformFormatWithSpread, convertToEnglishFormat} from "../../services/func/transformFunc"

export default function InputWithShiftLabel({mode, title}) {
    const labelRef = useRef();
    const [valueInp, setValueInp] = useState(null);
    const changePosition = () => {
        labelRef.current.classList.toggle("top-3")
        labelRef.current.classList.toggle("-top-4")
    }
    const onChangeValue = (e) => {
        if(valueInp == null) {
            setValueInp(transformFormatWithSpread(e.target.value))
        } else {
            setValueInp(transformFormatWithSpread(convertToEnglishFormat(e.target.value)))
        }
    }
    return (
        <div className="w-full h-14 flex flex-row items-center justify-between px-1 border border-[#d7d7d7] rounded-xl relative">
            <label ref={labelRef} className={`text-[14px] p-1 absolute right-2 bg-white top-3`}>{title}</label>
            <input onClick={() => changePosition()} onChange={(e) => onChangeValue(e)} inputMode={mode} value={(valueInp != null) ? valueInp: ""} type="text" className="w-4/5 h-4/5 outline-0 px-3"/>
            <span className="w-1/5 h-4/5 flex justify-center items-center">تومان</span>
        </div>
    )
}