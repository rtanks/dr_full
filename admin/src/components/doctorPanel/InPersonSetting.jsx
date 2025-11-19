import { useDispatch, useSelector } from "react-redux";
import TestHeader from "../generalComponent/HeaderTest";
import { isEmptyArray } from "../../services/func/requirementFunc";
import notFoundResult from "../../assets/images/notfoundresult.png";
import useCalender from "../../services/hooks/useCalender";
import { isEqual } from "lodash";
import { transformFormat } from "../../services/func/transformFunc";
import { useState } from "react";
import { first } from "../../services/hooks/useCalender";
import { addInPersonTimeConsulting, changeStatusActive } from "../../slices/doctorSlice";
import classNames from "classnames";
import AddTime from "./AddTime";


export default function InPersonSetting ({goBack,onClick, onClick2, onClick3}) {
    const turnTime = useSelector(state => state.doctor.consulting.inPerson);
    const {getDates} = useCalender();
    const dispatch =  useDispatch();
    const [dateSelected, setDateSelected] = useState(null);
    const categoryOfTimes = () => {
        console.log(turnTime.times.timeConsulting)
        const morning = turnTime.times.timeConsulting.filter(item => item.start.hour >= 9 && item.start.hour < 12);
        const noon = turnTime.times.timeConsulting.filter(item => item.start.hour >= 12 && item.start.hour <= 15);
        const evening = turnTime.times.timeConsulting.filter(item => item.start.hour >= 17 && item.start.hour <= 20);
        return (
            <>
                <AddTime key={0} title={"صبح"} times={morning}/>
                <AddTime key={1} title={"ظهر"} times={noon}/>
                <AddTime key={2} title={"عصر"} times={evening}/>
            </>
        )
    }
    const getDateSelected = () => {
        if(dateSelected == null) {
            console.log("hi")
            dispatch(addInPersonTimeConsulting({date: first, times: null}));
            dispatch(changeStatusActive());
        } else {
            dispatch(addInPersonTimeConsulting({date: dateSelected, times: null}));
            dispatch(changeStatusActive());
        }
        onClick()
    }
    const showStatus = classNames({
        "text-[#00C313] bg-[#CDF2D3]": turnTime.status,
        "text-[#676767] bg-[#e9e9e9]": !turnTime.status
    })
    return (
        <div className="w-full h-full bg-white vazir-medium fixed left-0 top-0 z-50 overflow-y-scroll">
            <div className="w-[402px] h-[89%] mx-auto">
                <TestHeader title={"تنظیم نوبت دهی حضوری"} onClick={() => goBack()}/>
                <div className="w-[90%] h-max mx-auto flex flex-col gap-5">
                    <span className="text-[16px]">انتخاب تاریخ</span>
                    <div className="w-full h-[76px] mx-auto flex flex-row items-center justify-between bg-white pb-6 overflow-x-scroll">
                        {
                            getDates().map((date, index) => (
                                <div onClick={() => setDateSelected(date)} key={index}
                                className={`w-max flex flex-col rounded-[10px] items-center gap-[2px] justify-center py-1 px-4 text-[14px] 
                                ${ (dateSelected == null ? isEqual(first, date): isEqual(dateSelected, date)) ? "bg-[#e6f3ff] text-[#006ECF]": "text-[#b9b9b9] bg-white"}`}>
                                    <span>{date.weekDay}</span>
                                    <span>{transformFormat(`${date.year}/${date.month}/${date.day}`)}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    isEmptyArray(turnTime.times.date)? (
                        <>
                            <div className="w-full h-3/5 flex items-center justify-center">
                                <div className="w-max flex flex-col items-center gap-2">
                                    <img src={notFoundResult} alt="not found result" width={121} height={117}/>
                                    <span className="text-[14px] text-[#b9b9b9]">بازه های مشاوره خالیست</span>
                                </div>
                            </div>
                            <div className="w-[402px] border-t border-t-[#e9e9e9] bg-white p-5 mx-auto fixed bottom-0 left-0 right-0 flex flex-col items-center">
                                <button type="button" onClick={getDateSelected} className="w-full h-12 flex text-[15px] items-center justify-center rounded-[10px] bg-[#006ecf] text-white">ایجاد بازه مشاوره</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full flex flex-row px-5 text-[14px] items-center justify-between">
                                <span>مشاوره های شما در این تاریخ</span>
                                <div className={`w-[84px] h-10 hover:cursor-pointer flex justify-center items-center text-[16px] rounded-[10px] ${showStatus}`}>
                                    {
                                        turnTime.status ? "فعال" : "غیر فعال"
                                    }
                                </div>
                            </div>
                            <div className="w-full h-max flex flex-col gap-2 px-5">
                                {
                                    categoryOfTimes()
                                }
                            </div>
                            <div className="w-full sm:w-[402px] mx-auto justify-center fixed bottom-0 left-0 right-0 border-t border-t-[#eee] flex flex-row gap-2 py-3 bg-white">
                                <button onClick={onClick2} type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] text-[#676767] bg-[#e9e9e9]">ویرایش امروز</button>
                                <button onClick={onClick3} type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] text-[#676767] bg-[#e9e9e9]">ایجاد روتین مشاوره</button>
                            </div>
                        </>
                    )
                }
                    
            </div>
        </div>
    )
}