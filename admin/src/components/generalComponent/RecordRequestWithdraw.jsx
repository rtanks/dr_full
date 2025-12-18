import { useRef, useState } from "react";
import { convertToEnglishFormat, transformFormat} from "../../services/func/transformFunc"

export default function RecordRequestWithdraw({mode, title, additionalStyle}) {
    const labelRef = useRef();
    const [valueInp, setValueInp] = useState(null);
    const changePosition = () => {
        labelRef.current.classList.toggle("top-3")
        labelRef.current.classList.toggle("-top-4")
    }
    const onChangeValue = (e) => {
        if(valueInp == null) {
            setValueInp(transformFormat(e.target.value))
        } else {
            setValueInp(transformFormat(convertToEnglishFormat(e.target.value)))
        }
    }
    return (
        <div className={`h-14 flex flex-row items-center justify-between px-1 border border-[#d7d7d7] rounded-xl relative ${additionalStyle}`}>
            <label ref={labelRef} className={`text-[14px] p-1 absolute right-2 bg-white top-3`}>{title}</label>
            <input onClick={() => changePosition()} onChange={(e) => onChangeValue(e)} inputMode={mode} value={(valueInp != null) ? valueInp: ""} type="text" className="w-full h-4/5 outline-0 px-3"/>
        </div>
    )
}