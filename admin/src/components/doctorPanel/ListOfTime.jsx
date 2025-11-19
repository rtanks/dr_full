import { useDispatch,useSelector } from "react-redux";
import { addInPersonTimeConsulting } from "../../slices/doctorSlice";
import { useState, useEffect } from "react";

export default function ListOfTime({timeConSulting, timeRest}) {
    const dispatch = useDispatch();
    const selectTime = (e,time) => {
            dispatch(addInPersonTimeConsulting({date: null,times:  time}))
            e.currentTarget.classList.remove("text-[#676767]")
            e.currentTarget.classList.remove("bg-[#e9e9e9]")
            e.currentTarget.classList.add("text-[#006ECF]")
            e.currentTarget.classList.add("bg-[#006ECF33]")
        }
    const generateTime = () => {
        let timeTurn = [
        //     {
        //     start: {hour: 9, minute: 0},
        //     end: {hour: , minute:}
        // }
        ];
        // because in minute
        const tc = timeConSulting >= 60 ? {hour: Math.floor(timeConSulting / 60), minute: timeConSulting % 60} : {hour: 0, minute: timeConSulting};
        const tr = timeRest >= 60 ? {hour: Math.floor(timeRest / 60), minute: timeRest % 60} : {hour: 0, minute: timeRest};
        let h = 9;
        let min = 0;
        console.log(tc);
        console.log(tr)
        while(h <= 20) {
            if(timeTurn.length == 0) { 
                timeTurn.push({
                    start: {hour: h, minute: min},
                    end: {hour: tc.hour + h + Math.floor(min + tc.minute / 60), minute: (min + tc.minute) % 60}
                })
                h = h + tc.hour + tr.hour;
                min = min + tc.minute + tr.minute
                if(min >= 60) {
                     h = h + Math.floor(min / 60)
                     min = min % 60
                 }   
            } else { 
                timeTurn.push({
                    start: {hour: h, minute: min},
                    end: {hour: tc.hour + h + Math.floor(min + tc.minute / 60), minute: (min + tc.minute) % 60}
                })
                h = h + tc.hour + tr.hour;
                min = min + tc.minute + tr.minute
                if(min >= 60) {
                     h = h + Math.floor(min / 60)
                     min = min % 60
                 }
        }
    }
    return timeTurn;
    }
    const dateIsSelected = useSelector(state => state.doctor.consulting)
    useEffect(() => {
            console.log(dateIsSelected)
        }, [dateIsSelected])
    return (
        <div className="w-full h-max flex flex-row flex-wrap gap-2">
            {
                generateTime().map((item, index) => (<div onClick={(e) => selectTime(e,item)} key={index} className={`text-[16px] p-2 w-max h-10 flex flex-row gap-0.5 rounded-[10px] text-[#676767] bg-[#e9e9e9]`}>
                <span>{item.start.hour}:{item.start.minute == 0 ? "00" : item.start.minute}</span>
                 تا 
                <span>{item.end.hour}:{item.end.minute == 0 ? "00" : item.end.minute}</span>
                </div>))
            }
        </div>
    )
}