import { useState } from "react";
import DatePicker from "./DatePicker";
import { calculatePersianAgeFromDate } from "../../../services/functions";

export default function Calender({initialDate, getDate, placeholder, style}) {
    const [modal, setModal] = useState(false);
    const close = () => {
        setModal(false);
    }
    console.log(initialDate)
    return (
        <>
            <div className={`${style} h-12 rounded-xl text-gray-700 focus:outline-none bg-white border border-[#D1D5DB] text-right relative`}>
                <p type="text" onClick={() => setModal(true)}
                    className="w-full h-full rounded-xl text-gray-700 px-5 flex items-center focus:outline-none text-right">{initialDate? initialDate: placeholder}</p>
                <span className="absolute w-max text-main font-bold left-5 top-0 h-full flex justify-center items-center bg-transparent">
                    {
                        initialDate ? (calculatePersianAgeFromDate(initialDate) + " سال") : initialDate
                    }
                </span>
            </div>
            {modal && <DatePicker initialDate={initialDate} getDate={getDate} close={close}/>}
        </>
    )
}