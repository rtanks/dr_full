import {  useSelector } from "react-redux";
import TestHeader from "../generalComponent/HeaderTest";
import useCalender from "../../services/hooks/useCalender";
import { isEqual } from "lodash";
import { transformFormat } from "../../services/func/transformFunc";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import ListOfTime from "./ListOfTime";


export default function CreateTurnTime ({goBack,onClick}) {
    const {generateSimilarWeekDay, generateDateAfterToday, generateDateAfterDay} = useCalender();
    const dateIsSelected = useSelector(state => state.doctor.consulting)
    const [dateSelected, setDateSelected] = useState(dateIsSelected.inPerson.times.date[0]);
    const [timeConsulting, setTimeConSulting] = useState(5);
    const [timeRest, setTimeRest] = useState(5);
    const [proliferation, setProliferation] = useState(generateDateAfterDay(dateSelected.year, dateSelected.month, dateSelected.day, dateSelected.weekDay));
    const getRestTime = (time) => {
        setTimeRest(time)
    }
    const getConsultingTime = (time) => {
        setTimeConSulting(time)
    }
    useEffect(() => {
        console.log(dateIsSelected.inPerson)
        console.log(proliferation)
    }, [])

    return (
        <div className="w-full h-full bg-white vazir-medium fixed left-0 top-0 z-50 overflow-y-scroll">
            <div className="w-[402px] h-[89%] mx-auto">
                <TestHeader title={"ایجاد بازه مشاوره"} onClick={() => goBack()}/>
                <div className="w-[90%] h-max mx-auto flex flex-col gap-3">
                    <span className="text-[16px]">انتخاب تاریخ</span>
                    <div className="w-full h-[76px] mx-auto flex flex-row items-center justify-between bg-white">
                        {
                            generateSimilarWeekDay(dateSelected.year, dateSelected.month, dateSelected.day, dateSelected.weekDay).map((date, index) => (
                                <div onClick={() => setDateSelected(date)} key={index}
                                className={`w-max flex flex-col rounded-[10px] items-center gap-[2px] justify-center py-1 px-4 text-[14px] 
                                ${ (dateSelected == null ? true: isEqual(dateSelected, date)) ? "bg-[#e6f3ff] text-[#006ECF]": "text-[#b9b9b9] bg-white"}`}>
                                    <span>{date.weekDay}</span>
                                    <span>{transformFormat(`${date.year}/${date.month}/${date.day}`)}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="text-[14px] text-[#676767] w-full h-max">
                        <p>زمان ایجاد شده به تمام یکشنبه ها تخصیص داده میشود </p>
                        <p>با انتخاب گزینه تکثیر به سادگی ایجاد شده ها را در ایام دیگر هفته کپی کنید .</p>
                    </div>
                </div>
                <div className="w-full h-max flex flex-col mt-5">
                    <p className="text-[14px] text-[#676767] pr-5">زمان مشاوره با بیمار</p>
                    <ProgressBar getValue={getConsultingTime}/>
                </div>
                <div className="w-full h-max flex flex-col my-5">
                    <p className="text-[14px] text-[#676767] pr-5">استراحت بین  هر مشاوره</p>
                    <ProgressBar getValue={getRestTime}/>
                </div>
                <div className="w-full border-t-[6px] border-t-[#f5f5f5] p-5 pb-72 flex flex-col gap-4">
                    <p className="text-[14px] text-[#676767]">انتخاب زمان مشاوره</p>
                    {
                        timeConsulting == 5 && timeRest == 5 ? "" : (
                            <ListOfTime timeConSulting={timeConsulting} timeRest={timeRest}/>
                        )
                    }
                </div>
                <div className="w-[402px] mx-auto fixed bottom-0 left-0 right-0 p-5 bg-white">
                    <div className="w-full h-max border-t border-t-[#eee] flex flex-col gap-2">
                        <p className="py-1">تکثیر به</p>
                        <div className="w-full h-[70px] mx-auto flex flex-row items-center justify-between bg-white overflow-x-scroll">
                            {
                                generateDateAfterToday(dateSelected.year, dateSelected.month, dateSelected.day, dateSelected.weekDay).map((date, index) => (
                                    <div onClick={() => setProliferation(date)} key={index}
                                    className={`w-max flex flex-col rounded-[10px] whitespace-nowrap items-center gap-[2px] justify-center py-1 px-4 text-[14px] 
                                    ${ (proliferation == null ? true: isEqual(proliferation, date)) ? "bg-[#e6f3ff] text-[#006ECF]": "text-[#b9b9b9] bg-white"}`}>
                                        <span className="">{date.weekDay}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full border-t border-t-[#eee] flex flex-row gap-2 py-3">
                        <button type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] border bg-transparent text-[#ff0000]">لغو اقدام</button>
                        <button onClick={onClick} type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] bg-[#006ecf] text-white">ثبت اطلاعات</button>
                    </div>
                </div>
            </div>
        </div>
    )
}