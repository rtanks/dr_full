import { useState } from "react";
import { convertAndGetDateFormatToPersian } from "../services/func/transformDateJalali";

export default function SelectDate({getValue, initialDate}) {
    const [selected, setSelected] = useState(()=> {
        if(initialDate) {
            console.log(initialDate.index)
            return initialDate.index;
        } else {
            console.log(0)
            return 0;
        }
    });
    const getBirthdayValue = (index) => {
        if(selected == index + 1) {
            setSelected(0);
            getValue('dateRefer', {date: '', index: 0})
        } else {
            setSelected(index + 1);
            getValue('dateRefer', {date: convertAndGetDateFormatToPersian(index + 1), index: index + 1})
        }
    }
    const numbersElem = () => {
        const days = new Array(30).fill(0);
        return days.map((day, index) => (
        <div key={index} onClick={() => { console.log(index , index + 1, selected);
            getBirthdayValue(index)
            }}
        className={`w-8 h-8 flex 
        ${selected == (index + 1) ? "bg-[#06b6d4] text-white": "bg-white text-black"}
        justify-center items-center rounded-md text-sm`}>{index + 1}</div>));
    }
    return (
        <div className="w-full h-max flex flex-row flex-wrap gap-2">
            {
                numbersElem()
            }
        </div>
    )
}