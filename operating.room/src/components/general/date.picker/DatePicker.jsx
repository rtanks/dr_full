import { useEffect, useRef, useState } from "react";
import { createArrayWithStartAndEndValue } from "../../../services/func/functionalFunc";
import PartOfDate from "./PartOfDate";
import { transformFormat } from "../../../services/func/transformFunc";

export default function DatePicker({getDate, close, initialDate}) {
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [initial, setInitial] = useState({day: 0, month: 0, year: 0})

    const getDay = (val) => {setDay(val)}
    const getMonth = (val) => {setMonth(val)}
    const getYear = (val) => {setYear(val)}

    const getYears = () => {
        const now = new Date();
        const year = now.getFullYear() - 621;
        return createArrayWithStartAndEndValue(1300, year)
    }
    useEffect(() => {
        if(initialDate) {
            const initialVal = initialDate.split('/');
            console.log(initialVal)
            setInitial({day: initialVal[2] - 1, month: initialVal[1] - 1 , year: getYears().findIndex(item => item == initialVal[0])});
        } else {
            setInitial({day: 17, month: 4 , year: getYears().findIndex(item => item == 1370)});
        }
    }, [])
    return (
        <div onClick={() => close()} className="w-full h-screen flex flex-col fixed z-50 left-0 top-0 items-center justify-center bg-[#0007] px-5">
            <div onClick={(e) => e.stopPropagation()} className="w-[100%] sm:w-[28%] h-[75%] bg-white rounded-xl flex flex-col gap-3 px-5 py-3">
                <div className="w-full h-max text-black text-lg font-bold mt-5">انتخاب تاریخ</div>
                <div className="w-full h-[73%] bg-white rounded-xl flex flex-row relative">
                    <div className="w-[92%] border h-[15%] bg-gray-100 absolute left-[4%] top-[42%] rounded-xl z-0"></div>
                    {/* day */}
                    <PartOfDate items={createArrayWithStartAndEndValue(1, 30)} initialIndex={initial.day} getValue={getDay}/>
                    
                    {/* month */}
                    <PartOfDate items={createArrayWithStartAndEndValue(1, 12)} initialIndex={initial.month} getValue={getMonth}/>

                    {/* year */}
                    <PartOfDate items={getYears()} initialIndex={initial.year} getValue={getYear}/>
                        
                </div>
                <div className="w-full h-[15%] flex justify-center items-center">
                    <button onClick={() => {console.log(`${year}/${month}/${day}`);getDate(`${year}/${month}/${day}`);close();}} className="text-white font-bold bg-main rounded-xl w-full h-[85%] flex flex-row items-center justify-center gap-1">
                        <span> تایید تاریخ</span>
                        <span>{`${transformFormat(day)} / ${transformFormat(month)} / ${transformFormat(year)} `}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
